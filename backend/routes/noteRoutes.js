const express = require("express");
const {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/", getAllNotes);
router.post("/", upload.single("file"), createNote);
router.put("/:id", upload.single("file"), updateNote);
router.delete("/:id", deleteNote);
module.exports = router;
