// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Db, Document, InsertOneResult, WithId, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { hasFileUpload, toJsonRecords } from "../../lib/file-upload-util";
import * as mongo from "../../lib/mongodb";
import * as model from "../../model/";

function CreateEvent : model.Event(
  coachesUUID: string[],
  volunteersUUID: string[],
  participantsUUID: string[],
  name: string,
  start_date: string,
  end_date: string,
  mongo: Db
) {
    let coachAttendances : model.EventAttendance[];
    let volunteerAttendances : model.EventAttendance[];
    let participantAttendances : model.EventAttendance[];
    
    
    for (let coach in coachesUUID)
    {
      let out : model.EventAttendance = {
        id: coach,
        attended: false
      }
      coachAttendances.push(out);
    }
    
    for (let volunteer in volunteersUUID)
    {
      let out : model.EventAttendance = {
        id: volunteer,
        attended: false
      }
      volunteerAttendances.push(out);
    }
    
    for (let participant in participantsUUID)
    {
      let out : model.EventAttendance = {
        id: participant,
        attended: false
      }
      participantAttendances.push(out);
      
    }

    const event : model.Event = {
      name: name,
      start_date: start_date,
      end_date: end_date,
      coaches: coachAttendances,
      volunteers: volunteerAttendances,
      participants: participantAttendances,

    }

    return event;

}