const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log("Node:", process.version);
    console.log("Mongoose:", mongoose.version);
    console.log("URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("====== ERROR ======");
    console.error(err);
  }
}

module.exports = connectDB;