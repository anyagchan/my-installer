import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB client
    await client.connect();

    // Get the database and collection
    const database = client.db("MyInstaller");
    const collection = database.collection("stores");

    // Extract the ID from the request URL
    const { id } = req.query;

    // Check if an ID was provided
    if (id) {
      // Find a single store by its ID
      const store = await collection.findOne({ _id: new ObjectId(id) });

      // If the store was found, return it; otherwise, return a 404
      if (store) {
        return res.status(200).json(store);
      } else {
        return res.status(404).json({ message: "Store not found" });
      }
    } else {
      // If no ID is provided, return all stores (or handle as you see fit)
      const allStores = await collection.find({}).toArray();
      return res.status(200).json(allStores);
    }
  } catch (error) {
    // Handle any errors that occur during the database operations
    return res.status(500).json({ message: "Something went wrong!" });
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}
