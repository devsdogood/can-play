// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  const collection = req.query.collection as string;
  const data = req.body;

  const models = Object.keys(prisma).filter(k => !(k.startsWith("$") || k.startsWith("_")));
  if (!models.includes(collection)) {
    return res.status(400).send({ message: "Collection does not exist" });
  }

  // type safety: collection must exist
  // @ts-ignore
  const update = await prisma[collection].update({
    where: {
      id: data.id,
    },
    data: data.data,
  });
  
  res.status(200).send({ message: "Updated data" })
}
