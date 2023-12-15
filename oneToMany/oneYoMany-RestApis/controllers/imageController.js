const Image = require("../models").Image;
const Tutorial = require("../models").Tutorial;

// Create a new image and associate it with a tutorial
exports.createImage = async (req, res) => {
  try {
    const tutorialId = req.params.tutorialId;
    const image = await Image.create(req.body);

    const updatedTutorial = await Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: {
          images: {
            _id: image._id,
            url: image.url,
            caption: image.caption,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json(updatedTutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
