const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5uwr5.mongodb.net/e-commerce-app?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("sunglass_shop");
    const productCollection = database.collection("products");
    const orderCollection = database.collection("orders");
    const usersCollection = database.collection("users");
    const reviewCollection = database.collection("reviews");

    //add api
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.json(result);
    });

    //add order
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.json(result);
    });
    //add review
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.json(result);
    });

    // get reviews
    app.get("/reviews", async (req, res) => {
      const cursor = reviewCollection.find({});
      const allReviews = await cursor.toArray();
      res.json(allReviews);
    });

    //add user info
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);

      res.json(result);
    });
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
