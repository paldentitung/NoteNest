const express = require("express");
const cors = require("cors");
const noteRoute = require("./routes/noteRoutes.js");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoute);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`server running in ${PORT}`);
});
