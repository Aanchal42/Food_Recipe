const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/connectionDb");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

app.use(cors({
  origin: "*", // later restrict to frontend URL
}));

app.use(express.json());

// serve uploaded images
app.use("/images", express.static("public/images"));

app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
