// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Db, Document, InsertOneResult } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { hasFileUpload, toJsonRecords } from "../../lib/file-upload-util";
import { connectToDB } from "../../lib/mongodb";
import * as model from "../../model";

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

      const event: model.Event = {
        name: "",
        coaches: [],
        volunteers: [],
        participants: [],
        details: {},
      };

      for (const record of records) {
        const registration = transform(record);
        if (!event.name) {
          event.name = registration.event.name;
        }

        const insertedParent = await storeParentGuardian(
          mongo,
          registration.parent_guardian
        );

        const insertedParticipant = await storeParticipant(mongo, {
          ...registration.participant,
          parent_guardian_id: insertedParent.insertedId.toHexString(),
        });

        event.participants.push({
          id: insertedParticipant.insertedId.toHexString(),
          name: registration.participant.name,
        });
      }
      await storeEvent(mongo, event);

      res.status(200).send({ message: "Success" });
    } catch (e) {
      console.error(`Unexpected error in /api/form-data: ${e}`);
      res.status(500).send({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).send({ message: "Bad Request" });
  }
}

function transform(record: Record<string, string>): model.EventRegistration {
  const event: Pick<model.Event, "name"> = {
    name: record["Event"],
  };
  const parent_guardian: model.ParentGuardian = {
    name: record["Name"]?.split(" ") || [],
    contact_info: [record["Parent/Guardian Phone Number"], record["Email"]],
    employer: record["employer"],
    address: record["Address"],
    payment_method: {
      payment_id: record["Transaction ID"],
      amount: record["Total price"],
    },
  };
  const participant: model.Participant = {
    parent_guardian_id: "",
    name: record["Participant's  name "]?.split(" ") || [],
    age: Number(record["Participant's  age"]),
    birth_date: record["Participant's date of birth  (MM/DD/YYYY)"],
    grade: record["Participant's grade"],
    tshirt_size: record["Participant's T-shirt size"],
    address: record["Address"],
    food_restrictions: record["Please list food restrictions for participant"],
    notes: record["Attachments"],
    emergency_contact: {
      name: record["Emergency contact name (if different)"]
        ? record["Emergency contact name (if different)"].split(" ")
        : parent_guardian.name,
      info: record["Emergency contact phone (if different)"]
        ? [record["Emergency contact phone (if different)"]]
        : parent_guardian.contact_info,
    },
  };
  return {
    event: event as model.Event,
    parent_guardian,
    participant,
  };
}

async function storeEvent(
  mongo: Db,
  event: model.Event
): Promise<InsertOneResult<Document>> {
  return mongo.collection("events").insertOne(event);
}

async function storeParentGuardian(
  mongo: Db,
  parent_guardian: model.ParentGuardian
): Promise<InsertOneResult<Document>> {
  return mongo.collection("parentguardians").insertOne(parent_guardian);
}

async function storeParticipant(
  mongo: Db,
  participant: model.Participant
): Promise<InsertOneResult<Document>> {
  return mongo.collection("participants").insertOne(participant);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
