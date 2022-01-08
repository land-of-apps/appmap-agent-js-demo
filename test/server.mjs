
import { strict as assert } from "assert";
import { Server } from "http";
import {createServerAsync, listenServerAsync, closeServerAsync} from "../lib/server.mjs";

describe("createServerAsync", () => {
  it("should return a http.Server", async () => {
    assert.ok(await createServerAsync(":memory:") instanceof Server);
  });
});

describe("listenServerAsync", () => {
  it("should return a port number", async () => {
    const server = await createServerAsync(":memory:");
    assert.equal(typeof await listenServerAsync(server, 0), "number");
    await closeServerAsync(server);
  });
});
