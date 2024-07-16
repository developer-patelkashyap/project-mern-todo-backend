require("dotenv").config;

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: ServerApiVersion.v1,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB Cloud Connected");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
