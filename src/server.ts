/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
import { connectRedis } from "./app/config/redis.config";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("Connected to Database!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to PORT ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await connectRedis();
  await startServer();
  await seedSuperAdmin();
})();

process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection Detected... Server shutting down...", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception Detected... Server shutting down...", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved... Server shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// unhandled rejection error
// Promise.reject(new Error("I forgot to catch this Promise"));

// uncaught exception error
// throw new Error("I forgot to handle this local error");

/**
 * ==> These are server error handlers
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */
