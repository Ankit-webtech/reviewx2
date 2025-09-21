const express = require("express");
const aiController = require("../controllers/ai.controller");

const router = express.Router();

// POST route for code review
router.post("/get-review", aiController.getReview);

module.exports = router;
