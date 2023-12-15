// controllers/tutorialController.js
const Tutorial = require("../models").Tutorial;

exports.createTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.create(req.body);
    res.status(201).json(tutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addTutorialToCategory = async (req, res) => {
  try {
    const tutorialId = req.params.tutorialId;
    const categoryId = req.params.categoryId;
    const tutorial = await Tutorial.findByIdAndUpdate(
      tutorialId,
      { category: categoryId },
      { new: true, useFindAndModify: false }
    );
    res.json(tutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTutorialWithPopulate = async (req, res) => {
  try {
    const tutorialId = req.params.tutorialId;
    const tutorial = await Tutorial.findById(tutorialId)
      .populate("comments", "-_id -__v")
      .populate("category", "name -_id")
      .select("-images._id -__v");
    res.json(tutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTutorialsInCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const tutorials = await Tutorial.find({ category: categoryId })
      .populate("category", "name -_id")
      .select("-comments -images -__v");
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
