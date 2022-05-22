import { Placeholder } from "./core/client/Placeholder";
import { config } from "dotenv";

config();

const bot = new Placeholder();

const unhandledRejections = new Map<any, Promise<unknown>>();

process.on("exit", (code) => console.error(`Process ends with ${code}`));
process.on("unhandledRejection", (reason: any, promise: Promise<unknown>) => {
  unhandledRejections.set(reason, promise);
});
process.on("rejectionHandled", (promise: Promise<unknown>) => {
  unhandledRejections.delete(promise);
});
process.on("uncaughtException", (exception, origin) =>
  console.error(`Caught exception ${exception} \n origin : ${origin}`)
);
process.on("warn", (warning) =>
  console.warn(
    `name: ${warning.name}\n message: ${warning.message}\n stack: ${warning.stack}`
  )
);
process.on("error", (error) =>
  console.error(
    `name: ${error.name}\n message: ${error.message}\n stack: ${error.stack}`
  )
);

bot.start();
