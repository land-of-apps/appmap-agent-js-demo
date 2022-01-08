import { strict as assert } from "assert";
import { Server } from "net";
import {
  createServerAsync,
  listenServerAsync,
  closeServerAsync,
} from "../src/server";

describe("createServerAsync", () => {
  it("should return a net.Server", async () => {
    assert.ok((await createServerAsync(":memory:")) instanceof Server);
  });
});

describe("listenServerAsync", () => {
  it("should return a port number", async () => {
    const server = await createServerAsync(":memory:");
    assert.equal(typeof (await listenServerAsync(server, 0)), "number");
    await closeServerAsync(server);
  });
});
