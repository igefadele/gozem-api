import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
    if (db) return db; // If already connected, return the existing connection

    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected successfully to MongoDB");
        db = client.db(dbName);
        return db;
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
};
