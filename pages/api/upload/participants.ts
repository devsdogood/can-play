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

      const event: model.Event = {
        name: "",
        start_date: "",
        end_date: "",
        coaches: [],
        volunteers: [],
        participants: [],
      };

      for (const record of records) {
        const registration = transform(record);
        if (!event.name) {
          event.name = registration.event.name;
          event.start_date = registration.event.start_date;
          event.end_date = registration.event.end_date;
        }

        const [existingPG, existingParticipant] = await Promise.all([
          mongo.findParentGuardian(client, registration.parent_guardian),
          mongo.findParticipant(client, registration.participant),
        ]);

        const parent_guardian_id = existingPG
          ? existingPG._id.toHexString()
          : (
              await mongo.storeParentGuardian(
                client,
                registration.parent_guardian
              )
            ).insertedId.toHexString();

        const participant_id = existingParticipant
          ? existingParticipant._id.toHexString()
          : (
              await mongo.storeParticipant(client, {
                ...registration.participant,
                parent_guardian_id,
              })
            ).insertedId.toHexString();

        event.participants.push({
          id: participant_id,
          name: registration.participant.name,
          attended: false,
        });
      }

      const existingEvent = await mongo.findEvent(client, event);
      if (existingEvent) {
        await mongo.updateEvent(client, {
          ...event,
          _id: existingEvent._id,
        });
      } else {
        await mongo.storeEvent(client, event);
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

function transform(record: Record<string, string>): model.EventRegistration {
  const event = <model.Event>{
    name: record["Event"],
    start_date: record["Start Date & Time"],
    end_date: record["End Date & Time"],
  };
  const parent_guardian: model.ParentGuardian = {
    name: record["Name"]?.split(" ") || [],
    phone_number: record["Parent/Guardian Phone Number"],
    email: record["Email"],
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
    birth_date: record["Participant's date of birth  (MM/DD/YYYY)"],
    grade: record["Participant's grade"],
    tshirt_size: record["Participant's T-shirt size"],
    address: record["Address"],
    food_restrictions: record["Please list food restrictions for participant"],
    notes: record["Attachments"],
    emergency_contact: {
      name: record["Emergency contact name (if different)"]?.split(" "),
      contact_info: {
        phone_number: record["Emergency contact phone (if different)"],
      },
    },
    attended: false,
  };

  return {
    event,
    parent_guardian,
    participant,
  };
}

export const config = {
  api: {
    bodyParser: false,
  },
};
