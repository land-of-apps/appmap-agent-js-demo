import { createServer } from "http";
import { AddressInfo, Server } from "net";
import { createApp } from "./app";
import { createDBAsync, initializeDBAsync } from "./db";

export const listenServerAsync = (
  server: Server,
  port: number
): Promise<number> =>
  new Promise((resolve, reject) => {
    server.on("error", reject);
    server.on("listening", () => {
      resolve((server.address() as AddressInfo).port);
    });
    server.listen(port);
  });

export const closeServerAsync = (server: Server): Promise<undefined> =>
  new Promise((resolve, reject) => {
    server.on("error", reject);
    server.on("close", resolve);
    server.close();
  });

export const createServerAsync = async (
  persistency: string
): Promise<Server> => {
  const db = await createDBAsync(persistency);
  await initializeDBAsync(db);
  const server = createServer(createApp(db));
  return server;
};
