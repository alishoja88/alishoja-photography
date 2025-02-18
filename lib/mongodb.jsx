  import { MongoClient } from "mongodb";

  const uri = process.env.MONGODB_URI;
  const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  let client;
  let db;

  if (!uri) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  export async function connectToDatabase() {
    if (client && db) {
      return { client, db };
    }

    try {
      client = await MongoClient.connect(uri, options);
      db = client.db("photo_gallery"); 
      
      console.log("🟢 MongoDB connected to", db.databaseName);
      return { client, db };
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      throw error;
    }
  }