import { strict as assert } from "assert";
import { Server } from "http";
import { closeServerAsync } from "../src/server";
// import {mainAsync} from "../src/index.ts";

foo;

describe("mainAsync", () => {
  it("should return a http.Server", async () => {
    const server = await mainAsync([]);
    assert.ok(server instanceof Server);
    await closeServerAsync(server);
  });
});
