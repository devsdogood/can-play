import { Db, InsertOneResult, WithId, MongoClient } from "mongodb";
import * as model from "../model";

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDB(): Promise<Db> {
  const mongo = await clientPromise;
  return mongo.db("eventRegistrationDB");
}

export const CollectionNames = {
  events: "events",
  parentguardians: "parentguardians",
  participants: "participants",
  coaches: "coaches",
  volunteers: "volunteers",
};

export async function findEvent(
  mongo: Db,
  event: model.Event
): Promise<WithId<model.Event> | null> {
  return mongo.collection<model.Event>(CollectionNames.events).findOne({
    name: event.name,
    start_date: event.start_date,
    end_date: event.end_date,
  });
}

export async function findParentGuardian(
  mongo: Db,
  parentGuardian: model.ParentGuardian
): Promise<WithId<model.ParentGuardian> | null> {
  return mongo
    .collection<model.ParentGuardian>(CollectionNames.parentguardians)
    .findOne({
      email: parentGuardian.email,
    });
}

export async function findParticipant(
  mongo: Db,
  participant: model.Participant
): Promise<WithId<model.Participant> | null> {
  return mongo
    .collection<model.Participant>(CollectionNames.participants)
    .findOne({
      name: participant.name,
    });
}

export async function findVolunteer(
  mongo: Db,
  volunteer: model.Volunteer
): Promise<WithId<model.Volunteer> | null> {
  return mongo.collection<model.Volunteer>(CollectionNames.volunteers).findOne({
    email: volunteer.email,
  });
}

export async function findCoach(
  mongo: Db,
  coach: model.Coach
): Promise<WithId<model.Coach> | null> {
  return mongo.collection<model.Coach>(CollectionNames.coaches).findOne({
    email: coach.email,
  });
}

export async function storeEvent(
  mongo: Db,
  event: model.Event
): Promise<InsertOneResult<model.Event>> {
  return mongo.collection<model.Event>("events").insertOne(event);
}

export async function storeParentGuardian(
  mongo: Db,
  parent_guardian: model.ParentGuardian
): Promise<InsertOneResult<model.ParentGuardian>> {
  return mongo
    .collection<model.ParentGuardian>(CollectionNames.parentguardians)
    .insertOne(parent_guardian);
}

export async function storeParticipant(
  mongo: Db,
  participant: model.Participant
): Promise<InsertOneResult<model.Participant>> {
  ``;
  return mongo
    .collection<model.Participant>(CollectionNames.participants)
    .insertOne(participant);
}

export async function storeVolunteer(
  mongo: Db,
  volunteer: model.Volunteer
): Promise<InsertOneResult<model.Volunteer>> {
  return mongo
    .collection<model.Volunteer>(CollectionNames.volunteers)
    .insertOne(volunteer);
}

export async function storeCoach(
  mongo: Db,
  coach: model.Coach
): Promise<InsertOneResult<model.Coach>> {
  return mongo
    .collection<model.Coach>(CollectionNames.coaches)
    .insertOne(coach);
}

export async function updateEvent(
  mongo: Db,
  event: WithId<model.Event>
): Promise<void> {
  await mongo
    .collection<model.Event>(CollectionNames.events)
    .updateOne({ _id: event._id }, event);
}
