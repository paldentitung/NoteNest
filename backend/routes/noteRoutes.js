const express = require("express");
const { getAllNotes, createNote } = require("../controllers/noteController");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/", getAllNotes);
router.post("/", upload.single("file"), createNote);
module.exports = router;
