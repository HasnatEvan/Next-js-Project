import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  userCollection: 'users',
  roomCollection: 'rooms',
  bookingCollection: 'bookings'
  
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nnldx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoClient singleton to reuse connection
let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  clientPromise = client.connect(); // returns a promise
}

export default async function dbConnect(collectionName) {
  await clientPromise; // ensure client is connected
  return client.db(process.env.DB_NAME).collection(collectionName);
}
