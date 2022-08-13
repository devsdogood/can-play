// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { hasFileUpload, toJsonRecords } from "../../lib/file-upload-util";
import { connectToDB } from "../../lib/mongodb";

interface ResponseData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (hasFileUpload(req)) {
    try {
      const mongo = await connectToDB();
      const records = await toJsonRecords(req);
      for (const record of records) {
        await storeInDatabase(mongo, record);
      }

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

async function storeInDatabase(mongo: MongoClient, record: any): Promise<void> {
  // TODO: parse CSV data
  console.log(`storing record in mongo. ${JSON.stringify(record)}`);
}
