// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { hasFileUpload, toJsonRecords } from "../../lib/file-upload-util";
import * as mongo from "../../lib/mongodb";
import * as model from "../../model";
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  

  req.body as model.Volunteer;
  res.status(200).send({message: "Success"});
  // update volunteer, coach, participant, parent/guardian record
  
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
      name:
        record["Emergency contact name (if different)"]?.split(" ") ||
        parent_guardian.name,
      contact_info: {
        phone_number: record["Emergency contact phone (if different)"],
      },
    },
    attended: false,
  };
  const volunteer : model.Volunteer = {
    name: record["Who"]?.split(" ") || [],
    date: record["Date"],
    start_time: record["Start Time"],
    end_time: record["End Time"],
    email: record["Email"],
    phone_number: record["Phone"],
  };
  return {
    event,
    parent_guardian,
    participant,
  };
}