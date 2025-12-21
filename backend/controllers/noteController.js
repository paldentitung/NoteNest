const fs = require("fs");
const path = require("path");

const filepath = path.join(__dirname, "../data/data.json");
const getNotes = () => {
  const data = fs.readFileSync(filepath, "utf8");
  return JSON.parse(data);
};

exports.getAllNotes = (req, res) => {
  const notes = getNotes();
  res.json(notes);
};
