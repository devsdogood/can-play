// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import * as mongo from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import * as model from "../../model";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await mongo.connectToDB();
  const { query } = useRouter();
  const collection = query.collection as string;
  if (
    Object.values(mongo.CollectionNames).includes(collection) &&
    req?.body?._id
  ) {
    client
      .collection(collection)
      .updateOne({ _id: new ObjectId(req.body._id) }, req.body);

    res.status(200).send({ message: "Success" });
  } else {
    console.warn(
      `URL path must be one of ${Object.values(mongo.CollectionNames)}`
    );
    res.status(400).send({ message: "Bad Request" });
  }
}
