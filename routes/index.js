const express = require("express");
const router = express.Router();
// eslint-disable-next-line
router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});
module.exports = router;