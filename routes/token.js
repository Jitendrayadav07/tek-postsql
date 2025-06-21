const express = require("express");
const router = express.Router();

const tokenController = require("../controllers/tokenController");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware');
const tokenSchema = require("../validations/tokenValidation");

router.get("/recent-tokens",
    JoiMiddleWare(tokenSchema.recentTokens, "query"),
    tokenController.recentTokens);

module.exports = router;