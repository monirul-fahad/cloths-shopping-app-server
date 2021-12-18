const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function run() {
  try {
    await client.connect();
    const database = client.db("sunglass_shop");
    const productCollection = database.collection("products");
  } finally {
    //  await client.close()
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("sunglass shop server is running");
});

app.listen(port, () => {
  console.log("server running at port", port);
});
