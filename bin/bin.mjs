#! /usr/bin/env node

import minimist from "minimist";
import {createServerAsync, listenServerAsync} from "../lib/server.mjs";

const options = {
  ... minimist(process.argv.slice()),
  persistency: ":memory:",
  port: 0,
};

const server = await createServerAsync(options.persistency);
const port = await listenServerAsync(server, options.port);
console.log(`app available on http://localhost:${port}`);
