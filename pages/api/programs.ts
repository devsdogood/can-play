// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as model from "../../model/";
import { Db, WithId, ObjectId } from "mongodb";

function newEvent(
  coachesUUID: string[],
  volunteersUUID: string[],
  participantsUUID: string[],
  name: string,
  start_date: string,
  end_date: string,
  mongo: Db
): model.Event {
  let coachAttendances: model.EventAttendance[] = [];
  let volunteerAttendances: model.EventAttendance[] = [];
  let participantAttendances: model.EventAttendance[] = [];

  for (let coach in coachesUUID) {
    let out: model.EventAttendance = {
      id: coach,
      attended: false,
    };
    coachAttendances.push(out);
  }

  for (let volunteer in volunteersUUID) {
    let out: model.EventAttendance = {
      id: volunteer,
      attended: false,
    };
    volunteerAttendances.push(out);
  }

  for (let participant in participantsUUID) {
    let out: model.EventAttendance = {
      id: participant,
      attended: false,
    };
    participantAttendances.push(out);
  }

  const event: model.Event = {
    name: name,
    start_date: start_date,
    end_date: end_date,
    coaches: coachAttendances,
    volunteers: volunteerAttendances,
    participants: participantAttendances,
  };

  mongo.collection("events").insertOne(event);

  return event;
}

function getEvent(
    name: string
) : model.Event {
    
    

}

function newProgram(
  name: string,
  startingEventUUIDs: string[],
  mongo: Db
): model.Program {
  const out: model.Program = {
    name: name,
    events: ((startingEventUUIDs.length > 0) ? startingEventUUIDs : [])
  };

  mongo.collection("Programs").insertOne(out);
  
  return out;
}

function appendToProgram(
  program: model.Program,
  eventUUID: string
): model.Program {
  program.events.push(eventUUID);
  return program;
}

function retrieveProgram(
  uuid: string,
  mongo: Db
): Promise<WithId<model.Program> | null> {
  return mongo
    .collection<model.Program>("Programs")
    .findOne({ _id: new ObjectId(uuid) });
}
