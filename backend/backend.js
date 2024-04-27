// This is copied code from activity 15, converted to read product data

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

app.get("/listProducts", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db.collection("fakestore_catalog").find(query).limit(100).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/:id", async (req, res) => {
  const productid = Number(req.params.id);
  console.log("Product to find :", productid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: productid };
  const results = await db.collection("fakestore_catalog").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

app.post("/addProduct", async (req, res) => {
  try {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const newDocument = {
      id: values[0], // also "id": req.body.id,
      title: values[1], // also "name": req.body.name,
      price: values[2], // also "price": req.body.price,
      description: values[3], // also "description": req.body.description,
      category: values[4],
      imageUrl: values[5], // also "imageUrl": req.body.imageUrl
      rating: values[6] // grabbing rating
    };

    console.log(newDocument);

    const results = await db.collection("fakestore_catalog").insertOne(newDocument);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred: ", error);
    res.status(500).send({ Error: "an internal server error occurrred" });
  }
});

app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Product to delete :", id);
    const query = { id: id };

    // read data from robot to delete to send it to frontend
    const robotDeleted = await db.collection("fakstore_catalog").findOne(query);

    // delete
    const results = await db.collection("fakestore_catalog").deleteOne(query);
    res.status(200);
    res.send(robotDeleted);
    res.send(results);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
});

app.put("/updateProduct/:id", async (req, res) => {
  const id = Number(req.params.id);
  const query = { id: id };
  await client.connect();
  console.log("Product to Update :", id);
  // Data for updating the document, typically comes from the request body
  // console.log(req.body);
  // read data from robot to update to send to frontend
  const robotUpdated = await db.collection("fakestore_catalog").findOne(query);
  const updateData = {
    $set: {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
      rating: req.body.rating
    },
  };
  // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
  const options = {};
  const results = await db
    .collection("fakestore_catalog")
    .updateOne(query, updateData, options);
  res.status(200);
  // If no document was found to update, you can choose to handle it by sending a 404 response
  if (results.matchedCount === 0) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.send(results);
  // res.send(robotUpdated);
});

app.get("/", async (req, res) => {});

const port = "8081";
const host = "localhost";

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
