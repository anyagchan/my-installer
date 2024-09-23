import { MongoClient } from "mongodb";

export async function GET(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    // Choose a name for your database
    const database = client.db("MyInstaller");

    // Choose a name for your collection
    const collection = database.collection("users");
    const allData = await collection.find({}).toArray();

    return new Response(JSON.stringify(allData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await client.close();
  }
}
