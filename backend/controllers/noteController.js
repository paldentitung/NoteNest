const fs = require("fs");
const path = require("path");

const filepath = path.join(__dirname, "../data/data.json");

const getNotes = () => {
  const data = fs.readFileSync(filepath, "utf8");
  return JSON.parse(data);
};

const saveNotes = (notes) => {
  fs.writeFileSync(filepath, JSON.stringify(notes, null, 2), "utf8");
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

exports.updateNote = (req, res) => {
  const id = parseInt(req.params.id);
  const notes = getNotes();
  const updatedNoteIndex = notes.findIndex((note) => note.id === id);

  if (updatedNoteIndex === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  const oldNote = notes[updatedNoteIndex];
  const { title, subject, semester, description, isFavorite } = req.body;

  notes[updatedNoteIndex] = {
    ...oldNote,
    title: title ?? oldNote.title,
    subject: subject ?? oldNote.subject,
    semester: semester ?? oldNote.semester,
    description: description ?? oldNote.description,
    isFavorite:
      isFavorite !== undefined
        ? isFavorite === "true" || isFavorite === true
        : oldNote.isFavorite,
    filePath: req.file
      ? `/${req.file.path.replace(/\\/g, "/")}`
      : oldNote.filePath,
    fileType: req.file
      ? req.file.mimetype.includes("pdf")
        ? "pdf"
        : "image"
      : oldNote.fileType,
  };

  saveNotes(notes);

  res
    .status(200)
    .json({ message: "Note updated", note: notes[updatedNoteIndex] });
};

exports.deleteNote = (req, res) => {
  const id = parseInt(req.params.id);
  const notes = getNotes();
  const deleteNoteIndex = notes.findIndex((note) => note.id === id);

  if (deleteNoteIndex === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  const deletedNote = notes.splice(deleteNoteIndex, 1)[0];
  saveNotes(notes);

  res.status(200).json({ message: "Note deleted", note: deletedNote });
};
