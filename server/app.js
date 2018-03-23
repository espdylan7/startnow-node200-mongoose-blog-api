const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require("morgan");

mongooseUri = process.env.MONGODB_URI ? 'mongodb://heroku_5bll6n7g:uckcj5d9og8d5b9i60i03ghtfa@ds123259.mlab.com:23259/heroku_5bll6n7g'
                : "mongodb://localhost/my-blog";

mongoose.connect(mongooseUri);
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