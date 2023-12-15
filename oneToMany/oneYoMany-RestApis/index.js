// app.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost/oneToMany", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

app.use(express.json());

// Import your controllers here
const tutorialController = require("./controllers/tutorialController");
const imageController = require("./controllers/imageController");
const commentController = require("./controllers/commentController");
const categoryController = require("./controllers/categoryController");

// Define routes
app.post("/api/tutorials", tutorialController.createTutorial);
app.post("/api/tutorials/:tutorialId/images", imageController.createImage);
app.post("/api/tutorials/:tutorialId/comments", commentController.createComment);
app.post("/api/categories", categoryController.createCategory);

app.put("/api/tutorials/:tutorialId/category/:categoryId", tutorialController.addTutorialToCategory);

app.get("/api/tutorials/:tutorialId", tutorialController.getTutorialWithPopulate);
app.get("/api/categories/:categoryId/tutorials", tutorialController.getTutorialsInCategory);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
