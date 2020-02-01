const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ useNewUrlParser: true,
 useUnifiedTopology: true });

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});


app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});





// get all workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

// add exercise
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id,{$push:{exercises:req.body}})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

// create workout
app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

// workouts in range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data);
     
    })
    .catch(err => {
      res.json(err);
    });
});





app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
