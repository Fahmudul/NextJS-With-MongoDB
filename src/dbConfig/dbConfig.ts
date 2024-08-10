import mongoose from "mongoose";
export async function connect() {
  try {
    // Attempts to connect to the MongoDB database specified in the environment variable MONGODB_URI.
    // If the connection is successful, logs a success message to the console.
    //
    // The `mongoose.connect()` method takes a single argument, the connection URL.
    // The `!` operator is a non-null assertion operator that tells TypeScript to treat `process.env.MONGODB_URI` as a non-null value.
    // It is used here because TypeScript doesn't know that `process.env.MONGODB_URI` will always be defined in a production environment.
    //
    // The `mongoose.connection` property is an instance of the `Connection` class, which represents the connection to the database.
    // The `on()` method is used to add an event listener for the "connected" event.
    // When the connection is established, the callback function is called.
    // In this case, it simply logs a success message to the console.
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.log(err);
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong");
    console.log(error);
  }
}
