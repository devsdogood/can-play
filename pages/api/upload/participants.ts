// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { hasFileUpload, toJsonRecords } from "../../../lib/file-upload-util";
import { PrismaClient } from '@prisma/client'
import { saveUploadedFiles } from "../../../lib/busboy";
import { registrationColumns as cols } from "../../../utils/csv-columns";
import * as _ from "lodash";

interface ResponseData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (hasFileUpload(req)) {
    try {
      const prisma = new PrismaClient();
      // TODO: consolidate into one call
      const fields = (await saveUploadedFiles(_.cloneDeep(req))).fields;
      
      let records: Record<string, string>[];
      try {
        records = await toJsonRecords(req, "participants");
      } catch (e: any) {
        return res.status(400).send({ message: e.message })
      }

      // find program based on year, activity, and location
      let program = await prisma.programs.findFirst({
        where: {
          year: parseInt(fields["year"]),
          activity: fields["sport"],
          location: fields["location"],
          address: fields["address"],
        },
        include: {
          slots: true,
        }
      });

      // create program if doesn't exist
      if (!program) {
        program = await prisma.programs.create({
          data: {
            year: parseInt(fields["year"]),
            activity: fields["sport"],
            location: fields["location"],
            address: fields["address"],
          },
          include: {
            slots: true,
          }
        })
      }

      // iterate over each registration
      for (const record of records) {
        const slotData = {
          start: record[cols.start],
          end: record[cols.end],
        };

        // find slot with start/end dates
        let slot = await prisma.event_slots.findFirst({
          where: {
            start_date: slotData.start,
            end_date: slotData.end,
            programs: {
              some: {
                id: program.id,
              }
            }
          }
        });

        // create slot if doesn't already exist
        if (!slot) {
          slot = await prisma.event_slots.create({
            data: {
              start_date: slotData.start,
              end_date: slotData.end,
            },
          })!;
        }

        // upsert guardian data
        const guardianData = _.pick(record, Object.values(cols.parent));
        const guardian = await prisma.parentguardians.upsert({
          where: {
            email: guardianData[cols.parent.email],
          },
          create: {
            email: guardianData[cols.parent.email],
            first_name: guardianData[cols.parent.name].split(" ")[0], // TODO: more robust name checking
            last_name: guardianData[cols.parent.name].split(" ")[1],
            phone: guardianData[cols.parent.phone],
            address: guardianData[cols.parent.address],
            employer: guardianData[cols.parent.employer],
            notes: "None",
          },
          // TODO: don't copy all these fields
          update: {
            email: guardianData[cols.parent.email],
            first_name: guardianData[cols.parent.name].split(" ")[0], // TODO: more robust name checking
            last_name: guardianData[cols.parent.name].split(" ")[1],
            phone: guardianData[cols.parent.phone],
            address: guardianData[cols.parent.address],
            employer: guardianData[cols.parent.employer],
          }
        });

        // check participant exists
        const participantCols = Object.values(cols.participant).concat(Object.values(cols.emergency)); 
        const participantData = _.pick(record, participantCols)
        let participant = await prisma.participants.findFirst({
          where: {
            first_name: participantData[cols.participant.name].split(" ")[0],
            last_name: participantData[cols.participant.name].split(" ")[1],
            birthdate: participantData[cols.participant.dob],
            guardians: {
              some: {
                id: guardian.id,
              }
            }
          }
        });

        if (!participant) {
          participant = await prisma.participants.create({
            data: {
              first_name: participantData[cols.participant.name].split(" ")[0],
              last_name: participantData[cols.participant.name].split(" ")[1],
              birthdate: participantData[cols.participant.dob],
              contact_name: participantData[cols.emergency.name],
              contact_phone: participantData[cols.emergency.phone],
              food_restrictions: participantData[cols.participant.food_restrictions],
              graduation_year: 2000, // TODO
              transportation_assistance: "None", // TODO
              health_needs: "None", // TODO
              notes: "None", // TODO
              guardians: {
                connect: {
                  id: guardian.id,
                }
              }
            }
          });
        }

        // add participant to slot
        await prisma.event_slots.update({
          where: {
            id: slot.id,
          },
          data: {
            participants: {
              push: {
                participantId: participant.id,
                attended: false,
              }
            },
            programs: {
              connect: {
                id: program.id,
              }
            }
          }
        })
      }

      res.status(200).send({ message: "Success" });
    } catch (e) {
      console.error(`Unexpected error in /api/upload/participants: ${e}`);
      res.status(500).send({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).send({ message: "Bad Request" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
