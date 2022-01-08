import minimist from "minimist";
import { Server } from "net";
import { createServerAsync, listenServerAsync } from "./server";

export const mainAsync = async (argv: string[]): Promise<Server> => {
  const options = {
    ...minimist(argv),
    persistency: ":memory:",
    port: 0,
  };
  const server = await createServerAsync(options.persistency);
  const port = await listenServerAsync(server, options.port);
  console.log(`app available on http://localhost:${port}`);
  return server;
};
