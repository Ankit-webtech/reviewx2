const aiService = require("../services/ai.service");

exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;
    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService(code);
    res.send(response);

  } catch (err) {
    console.error("AI Controller Error:", err);
    res.status(500).send("Error generating AI response");
  }
};
