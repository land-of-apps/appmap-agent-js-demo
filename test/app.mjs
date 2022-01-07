import { createServer, request } from "http";
import { strict as assert } from "assert";
import sqlite3 from "sqlite3";
import { createUserTableAsync } from "../lib/user.mjs";
import { createApp } from "../lib/app.mjs";

const listenAsync = (server, port) =>
  new Promise((resolve, reject) => {
    server.on("error", reject);
    server.on("listening", resolve);
    server.listen(port);
  });

const closeAsync = (server) =>
  new Promise((resolve, reject) => {
    server.on("error", reject);
    server.on("close", resolve);
    server.close();
  });

const requestAsync = (method, url) =>
  new Promise((resolve, reject) => {
    const req = request(url, { method });
    req.on("error", reject);
    req.on("response", (res) => {
      res.on("error", reject);
      let body = "";
      res.on("data", (chunk) => {
        body += chunk.toString("utf8");
      });
      res.on("end", () => {
        resolve({ status: res.statusCode, body });
      });
    });
    req.end();
  });

describe("GET /signup", async () => {
  it("should return 200 when email is unique", async () => {
    const db = new sqlite3.Database(":memory:");
    await createUserTableAsync(db);
    const server = createServer(createApp(db));
    await listenAsync(server, 8080);
    try {
      assert.deepEqual(
        await requestAsync(
          "POST",
          "http://localhost:8080/signup/john.doe@mail/1234/john"
        ),
        {body:"", status:200},
      );
    } finally {
      await closeAsync(server);
    }
  });
});
