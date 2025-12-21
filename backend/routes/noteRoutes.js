const express = require("express");
const { getAllNotes } = require("../controllers/noteController");

const router = express.Router();

router.get("/", getAllNotes);

module.exports = router;
