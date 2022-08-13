// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as model from "../../model/event-registration-db";
import { Db, WithId, ObjectId } from "mongodb";

async function newEvent(
  coachesUUID: string[],
  volunteersUUID: string[],
  participantsUUID: string[],
  name: string,
  start_date: string,
  end_date: string,
  mongo: Db
): Promise<string> {
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

  const event = await mongo.collection<model.Event>("events").insertOne({
    name: name,
    start_date: start_date,
    end_date: end_date,
    coaches: coachAttendances,
    volunteers: volunteerAttendances,
    participants: participantAttendances,
  });

  return event.insertedId.toHexString();
}


async function newProgram(
  name: string,
  startingEventUUIDs: string[],
  mongo: Db
): Promise<string> {
  const out: model.Program = {
    name: name,
    events: ((startingEventUUIDs.length > 0) ? startingEventUUIDs : [])
  };

  const event = await mongo.collection("Programs").insertOne(out);
  
  return event.insertedId.toHexString();
}

async function appendToProgram(
  programUUID: string,
  eventUUID: string,
  mongo: Db
) : Promise<string> {
  const out = await mongo.collection<model.Program>("Programs").findOne({_id: new ObjectId(programUUID)});
  if (out) {
    out?.events.push(eventUUID);
    mongo.collection<model.Program>("Programs").updateOne({ _id: new ObjectId(programUUID)}, out);
  }
  return programUUID;
}


function retrieveProgram(
  uuid: string,
  mongo: Db
): Promise<WithId<model.Program> | null> {
  return mongo
    .collection<model.Program>("Programs")
    .findOne({ _id: new ObjectId(uuid) });
}

function retrieveEvent(
    uuid: string,
    mongo: Db
) : Promise<WithId<model.Event> | null> {
    return mongo
        .collection<model.Event>("events")
        .findOne({ _id: new ObjectId(uuid) });
}

async function setPersonAsPresent(
    eventUUID: string,
    userUUID: string,
    mongo: Db
) : Promise<string> {
    const out = mongo.collection<>("Program").findOne({})

}























