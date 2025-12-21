const fs = require("fs");
const path = require("path");

const filepath = path.join(__dirname, "../data/data.json");
const getNotes = () => {
  const data = fs.readFileSync(filepath, "utf8");
  return JSON.parse(data);
};

const saveNotes = (Note) => {
  fs.writeFileSync(filepath, JSON.stringify(Note, null, 2), "utf8");
};
exports.getAllNotes = (req, res) => {
  const notes = getNotes();
  res.json(notes);
};

exports.createNote = (req, res) => {
  const notes = getNotes();
  const { title, subject, semester, description, isFavorite } = req.body;

  if (!title || !subject || !semester || !description) {
    return res.status(400).json({ message: "Enter valid info" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  const newNote = {
    id: Date.now(),
    title,
    subject,
    semester,
    description,
    isFavorite: isFavorite === "true" || isFavorite === true,
    fileType: req.file.mimetype.includes("pdf") ? "pdf" : "image",
    filePath: `/${req.file.path.replace(/\\/g, "/")}`,
  };

  notes.push(newNote);
  saveNotes(notes);

  res.json({ message: "Note created", note: newNote });
};
exports.deleteNote = (req, res) => {
  const id = parseInt(req.params.id);
  const notes = getNotes();
  const deleteNoteIndex = notes.findIndex((note) => note.id == id);

  if (deleteNoteIndex === -1) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  notes.splice(deleteNoteIndex, 1)[0];
  saveNotes(notes);

  res.status(200).json({
    message: "Note delete",
    note: this.deleteNote,
  });
};
