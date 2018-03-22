const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/de-node200-mongoose-blog-api';

mongoose.connect('mongodb://localhost/my-blog');
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));



app.get("/", (req, res) => {
    res.status(200).send("Only /api/blogs or api/users work right now");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/blogs", require("./routes/blogs"));



module.exports = app;