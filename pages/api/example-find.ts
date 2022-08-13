// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { hasFileUpload, toJsonRecords } from "../../lib/file-upload-util";
import { connectToDB } from "../../lib/mongodb";
import { randomUUID } from "crypto";
import * as model from "../../model";

interface ResponseData {
  message: string;
  records?: any[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const records: any[] = [];
    const mongo = await connectToDB();
    const cursor = mongo.collection("events").find();
    // replace console.dir with your callback to access individual elements
    await cursor.forEach( x => {
      records.push(x);
    });
    res.status(200).send({ message: "Success", records });
  } catch (e) {
    console.error(`Unexpected error in /api/example-find: ${e}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
