#! /usr/bin/env node

const minimist = require("minimist");
const {createServerAsync, listenServerAsync} = require("../dist/server.js");

const options = {
  ... minimist(process.argv.slice()),
  persistency: ":memory:",
  port: 0,
};

((async () => {
  const server = await createServerAsync(options.persistency);
  const port = await listenServerAsync(server, options.port);
  console.log(`app available on http://localhost:${port}`);
}) ());

