const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const todosRoute = require("./routes/todos");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/auth", authRoute);
app.use("/api/todos", todosRoute);


const PORT = process.env.PORT || 3000;

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to MongoDB")
  );

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
