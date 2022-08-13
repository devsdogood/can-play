/// <reference types="next" />
/// <reference types="next/types/global" />

import { MongoClient } from "mongodb";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      NODE_ENV: "development" | "production";
    }
  }

  var _mongoClientPromise: Promise<MongoClient>;
}

export {};
