import mongoose from "mongoose";
import 'dotenv/config'

require('dotenv').config()

function connectDatabase() {
  mongoose
    .connect(process.env.MONGODB_URI as string, {})
    .then(() => console.log("MongoDB Atlas Connected!"))
    .catch((err) => console.log(`Error connecting to MongoDB Atlas: ${err}`));
}

export default connectDatabase;