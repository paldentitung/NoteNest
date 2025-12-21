const express = require("express");
const {
  getAllNotes,
  createNote,
  deleteNote,
} = require("../controllers/noteController");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/", getAllNotes);
router.post("/", upload.single("file"), createNote);
router.delete("/:id", deleteNote);
module.exports = router;
