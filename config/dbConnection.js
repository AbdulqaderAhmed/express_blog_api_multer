import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const dbConnection = expressAsyncHandler(async () => {
  const connect = await mongoose.connect(process.env.DATABASE_CONNECTION);
  if (!connect) {
    console.log("Error connecting to database");
  } else {
    console.log(
      `Database connection established at host: ${connect.connection.host} and name: ${connect.connection.name}`
    );
  }
});
