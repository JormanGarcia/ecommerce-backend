const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Local Requires
const APIshop = require("./api/shop");
const APIadmin = require("./api/admin");
const APIitem = require("./api/item");
const db = require("./database/database");

const app = express();

// DB init
db.authenticate()
  .then((result) => {
    console.log("Db connection established.");
  })
  .catch((error) => {
    console.log("Unable to connect to db: ", error);
  });

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/shop", APIshop);
app.use("/admin", APIadmin);
app.use("/item", APIitem);

// Index Route
app.get("/", async (req, res) => {
  res.send("Welcome to the api");
});

app.listen(process.env.PORT, () =>
  console.log("App listen on port: " + process.env.PORT)
);
