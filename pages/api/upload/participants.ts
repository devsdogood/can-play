// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { hasFileUpload, toJsonRecords } from "../../../lib/file-upload-util";
import { PrismaClient } from '@prisma/client'
import { saveUploadedFiles } from "../../../lib/busboy";
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
      const records = await toJsonRecords(req);

      // find program based on year, activity, and location
      let program = await prisma.programs.findFirst({
        where: {
          year: parseInt(fields["year"]),
          activity: fields["sport"],
          location: fields["location"],
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
            address: "Somewhere", // TODO!
          },
          include: {
            slots: true,
          }
        })
      }

      // iterate over each registration
      for (const record of records) {
        const slotData = {
          start: record["Start Date & Time"],
          end: record["End Date & Time"],
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
        const guardianData = _.pick(record, ["Name", "Email", "Parent/Guardian Phone Number", "Address"]);
        const guardian = await prisma.parentguardians.upsert({
          where: {
            email: guardianData["Email"],
          },
          create: {
            email: guardianData["Email"],
            first_name: guardianData["Name"].split(" ")[0], // TODO: more robust name checking
            last_name: guardianData["Name"].split(" ")[1],
            phone: guardianData["Parent/Guardian Phone Number"],
            address: guardianData["Address"],
            employer: "None",
            notes: "None",
          },
          // TODO: don't copy all these fields
          update: {
            first_name: guardianData["Name"].split(" ")[0],
            last_name: guardianData["Name"].split(" ")[1],
            phone: guardianData["Parent/Guardian Phone Number"],
            address: guardianData["Address"]
          }
        });

        // check participant exists
        let participantData = _.pick(record, ["Emergency contact name (if different)", "Emergency contact phone (if different)", "Participant's  name ", "Participant's  age", "Participant's grade", "Participant's date of birth  (MM/DD/YYYY)", "Please list food restrictions for participant"])
        let participant = await prisma.participants.findFirst({
          where: {
            first_name: participantData["Participant's  name "].split(" ")[0],
            last_name: participantData["Participant's  name "].split(" ")[1],
            birthdate: participantData["Participant's date of birth  (MM/DD/YYYY)"],
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
              first_name: participantData["Participant's  name "].split(" ")[0],
              last_name: participantData["Participant's  name "].split(" ")[1],
              birthdate: participantData["Participant's date of birth  (MM/DD/YYYY)"],
              contact_name: participantData["Emergency contact name (if different)"],
              contact_phone: participantData["Emergency contact phone (if different)"],
              food_restrictions: participantData["Please list food restrictions for participant"],
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
