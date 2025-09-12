import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://ayushh1309:INn7LdH8lBZuVDVK@cluster0.r90favv.mongodb.net/RESUME"
    )
    .then(() => console.log("DB CONNECTED"));
};
