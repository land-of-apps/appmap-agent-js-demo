
import { createServerAsync, listenServerAsync } from "./server";

export const mainAsync = async (argv: string[]) => {
  const server = await createServerAsync(argv[1]);
  const port = await listenServerAsync(server, parseInt(argv[0]));
  console.log(`app available on http://localhost:${port}`);
  return server;
};
