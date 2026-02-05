// const mongoose = require("mongoose")

// const connectDb = async() => {
//     await mongoose.connect(process.env.CONNECTION_STRING)
//     .then(()=> console.log("connected..."))
// }

// module.exports = connectDb

const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB Atlas connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};

module.exports = connectDb;
