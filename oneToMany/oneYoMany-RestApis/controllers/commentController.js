const Comment = require("../models").Comment;
const Tutorial = require("../models").Tutorial;

// Create a new comment and associate it with a tutorial
exports.createComment = async (req, res) => {
  try {
    const tutorialId = req.params.tutorialId;
    const comment = await Comment.create(req.body);

    const updatedTutorial = await Tutorial.findByIdAndUpdate(
      tutorialId,
      { $push: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json(updatedTutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
