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
      const prisma = new PrismaClient()
      // TODO: consolidate into one call
      const fields = (await saveUploadedFiles(_.cloneDeep(req))).fields;
      
      let records: Record<string, string>[];
      try {
        records = await toJsonRecords(req, "volunteers");
      } catch (e: any) {
        return res.status(400).send({ message: e.message })
      }

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
          start: `${record["Date"]} ${record["Start Time"]}`,
          end: `${record["Date"]} ${record["End Time"]}`,
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

        // upsert volunteer data
        const volunteerData = _.pick(record, ["First Name", "Last Name", "Email", "Phone"]);
        const volunteer = await prisma.volunteers.upsert({
          where: {
            email: volunteerData["Email"],
          },
          create: {
            email: volunteerData["Email"],
            first_name: volunteerData["First Name"],
            last_name: volunteerData["Last Name"],
            phone: volunteerData["Phone"],
            address: "Address", // TODO
            age: 30, // TODO
            background_check_date: "10/10/2020", // TODO
            criminal_history: "None",
            employer: "None", // TODO
            notes: "None",
            refused_participation: false,
            school: "None",
            signed_waiver: true,
            volunteer_preference: "None",
          },
          // TODO: don't copy all these fields
          update: {
            first_name: volunteerData["First Name"],
            last_name: volunteerData["Last Name"],
            phone: volunteerData["Phone"],
          }
        });

        // add volunteer to slot
        await prisma.event_slots.update({
          where: {
            id: slot.id,
          },
          data: {
            volunteers: {
              push: {
                volunteerId: volunteer.id,
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
      console.error(`Unexpected error in /api/upload/volunteers: ${e}`);
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
