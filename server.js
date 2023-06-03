const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");
const Mood = require("./db/Mood");

//mongodb+srv://ahmed_1:qwe123@cluster0.g6teu.gcp.mongodb.net/CareAppDatabase?authSource=admin&replicaSet=atlas-d6x30o-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
// MongoDB
mongoose
  // .connect("mongodb+srv://azeem123:PupGoWM5t0uATnrl@cluster0.dbb68zp.mongodb.net/?retryWrites=true&w=majority", {
  .connect("mongodb+srv://admin:123@cluster0.h1vvj.mongodb.net/test?authSource=admin&replicaSet=atlas-swdh3h-shard-0&readPreference=primary&ssl=true", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = 4000;

app.use(bodyParser.json({ limit: 1000000000 })); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: 1000000000, extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json({ limit: 1000000000 }));
app.use(passportConfig.initialize());
// app.use(bodyParser({limit: '50mb'}));

//add data

async function fill_db() {
  const docs = [
    { mood: "depressed", score: 10, description: "" },
    { mood: "stressed", score: 20, description: "" },
    { mood: "upset", score: 30, description: "" },
    { mood: "tense", score: 40, description: "" },
    { mood: "fatigued", score: 50, description: "" },
    { mood: "calm", score: 60, description: "" },
    { mood: "relaxed", score: 70, description: "" },
    { mood: "happy", score: 80, description: "" },
    { mood: "excited", score: 90, description: "" },
    { mood: "joy", score: 100, description: "" },
  ];
  const result = await Mood.insertMany(docs);
}
// fill_db();

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
