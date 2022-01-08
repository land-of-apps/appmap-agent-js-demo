import { createServer } from "http";
import { createApp } from "./app";
import { createDBAsync, initializeDBAsync } from "./db";

export const listenServerAsync = (server, port) =>
  new Promise((resolve, reject) => {
    server.on("error", reject);
    server.on("listening", () => {
      resolve(server.address().port);
    });
    server.listen(port);
  });

export const closeServerAsync = (server) =>
  new Promise((resolve, reject) => {
    server.on("error", reject);
    server.on("close", resolve);
    server.close();
  });

export const createServerAsync = async (persistency) => {
  const db = await createDBAsync(persistency);
  await initializeDBAsync(db);
  const server = createServer(createApp(db));
  return server;
};
