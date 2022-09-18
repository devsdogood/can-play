// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { hasFileUpload, toJsonRecords } from "../../../lib/file-upload-util";
import * as mongo from "../../../lib/mongodb";
import * as model from "../../../model/event-registration-db";

interface ResponseData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (hasFileUpload(req)) {
    try {
      const client = await mongo.connectToDB();
      const records = await toJsonRecords(req);

      for (const record of records) {
        const volunteer: model.Volunteer = {
          name: record["Who"]?.split(" ") || [],
          start_time: record["Start Time"],
          end_time: record["End Time"],
          date: record["Date"],
          email: record["Email"],
          phone_number: record["Phone"],
        };
        const existingVolunteer = await mongo.findVolunteer(client, volunteer);
        const volunteer_id = existingVolunteer
          ? existingVolunteer?._id.toHexString()
          : (
              await mongo.storeVolunteer(client, volunteer)
            ).insertedId.toHexString();
      }
      // TODO: find event based on CSV and add volunteer to event

      res.status(200).send({ message: "Success" });
    } catch (e) {
      console.error(`Unexpected error in /api/form-data: ${e}`);
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
