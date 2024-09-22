import { MongoClient, ServerApiVersion, Db } from "mongodb";

const uri: string | undefined = process.env.DB_URI;

if (!uri) {
  throw new Error("Please define the DB_URI environment variable inside .env.local");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDB(): Promise<Db> {
  try {
    await client.connect();
    const database = client.db("graded02");

    console.log("Connected successfully to MongoDB");

    return database;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}
