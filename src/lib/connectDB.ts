import { MongoClient, Db, ServerApiVersion } from "mongodb";

let db: Db | undefined;

export const connectDB = async (): Promise<Db | undefined> => {
    if (db) return db;

    try {
        const uri = "mongodb+srv://tonmoyahamed2009:tonmoytoma22@cluster0.mi9iu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Direct URI
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        db = client.db('WayGO');
        return db;
    } catch (error) {
        console.log({ error });
    }
};
