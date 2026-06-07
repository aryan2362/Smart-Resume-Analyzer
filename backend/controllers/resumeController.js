const extractText = require("../utils/extractText");
const calculateATS = require("../utils/atsScore");

const uploadResume = async (req, res) => {
  try {
    const text = await extractText(req.file.path);

    const result = calculateATS(text);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { uploadResume };