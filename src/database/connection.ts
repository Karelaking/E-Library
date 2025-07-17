import mongoose from "mongoose";

/**
 * Establishes a connection to a MongoDB database using Mongoose.
 *
 * @param {Object} params - Connection parameters.
 * @param {string} params.databaseURL - The MongoDB connection string.
 *
 * @throws Will exit the process if the connection fails.
 *
 * Listens for events:
 * - "connected": Logs a message when the MongoDB connection is established.
 * - "error": Logs an error message if there's an issue with the MongoDB connection.
 */

const connection = async ({
  databaseURL,
}: {
  databaseURL: string;
}) => {
  try {

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    })

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
    });

    await mongoose.connect(`${databaseURL}`);

  } catch (error: any) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connection;
