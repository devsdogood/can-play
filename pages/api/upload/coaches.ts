// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Db } from "mongodb";
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
        const coach: model.Coach = {
          // TODO: transform record
        } as model.Coach;
        const existingCoach = await mongo.findCoach(client, coach);
        const coach_id = existingCoach
          ? existingCoach?._id.toHexString()
          : (await mongo.storeCoach(client, coach)).insertedId.toHexString();
      }
      // TODO: find event based on CSV and add coach to event

      res.status(200).send({ message: "Success" });
    } catch (e) {
      console.error(`Unexpected error in /api/upload/coaches: ${e}`);
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
