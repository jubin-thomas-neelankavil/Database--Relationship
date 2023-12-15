const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Import your models
const Tag = require("./models/Tag"); // Correct the path to your models
const Tutorial = require("./models/Tutorial"); // Correct the path to your models

// Mongoose configuration
mongoose.connect("mongodb://localhost/ManyToMany", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Controllers
const tagController = {
  getAllTags: async (req, res) => {
    try {
      const tags = await Tag.find().populate("tutorials");
      res.json(tags);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createTag: async (req, res) => {
    try {
      const tag = await Tag.create(req.body);
      res.json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // Add more controller functions as needed, e.g., updateTag, deleteTag.
};

const tutorialController = {
  getAllTutorials: async (req, res) => {
    try {
      const tutorials = await Tutorial.find().populate("tags");
      res.json(tutorials);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createTutorial: async (req, res) => {
    try {
      const tutorial = await Tutorial.create(req.body);
      res.json(tutorial);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // Add more controller functions as needed, e.g., updateTutorial, deleteTutorial.
};

// Routes for Tags
app.get("/tags", tagController.getAllTags);
app.post("/tags", tagController.createTag);

// Routes for Tutorials
app.get("/tutorials", tutorialController.getAllTutorials);
app.post("/tutorials", tutorialController.createTutorial);

// Define more routes as needed.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
