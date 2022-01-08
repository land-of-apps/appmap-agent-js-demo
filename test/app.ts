import { createServer, request } from "http";
import { strict as assert } from "assert";
import { createDBAsync, initializeDBAsync, signupAsync } from "../src/db";
import { listenServerAsync, closeServerAsync } from "../src/server";
import { createApp } from "../src/app";

const requestAsync = (options) =>
  new Promise((resolve, reject) => {
    const req = request(options);
    req.on("error", reject);
    req.on("response", (res) => {
      res.on("error", reject);
      let body = "";
      res.on("data", (chunk) => {
        body += chunk.toString("utf8");
      });
      res.on("end", () => {
        resolve({
          status: res.statusCode,
          body: body === "" ? null : JSON.parse(body),
        });
      });
    });
    req.end();
  });

const runAsync = async (app, method, path) => {
  const server = createServer(app);
  const port = await listenServerAsync(server, 0);
  try {
    return await requestAsync({ port, method, path });
  } finally {
    await closeServerAsync(server);
  }
};

const user = { email: "john.doe@mail", password: "1234", name: "john" };

describe("GET /signup", async () => {
  const path = `/signup/${user.email}/${user.password}/${user.name}`;
  it("should return 200 when email is unique", async () => {
    const db = await createDBAsync(":memory:");
    await initializeDBAsync(db);
    assert.deepEqual(await runAsync(createApp(db), "POST", path), {
      status: 200,
      body: null,
    });
  });
  it("should return 400 when email is duplicate", async () => {
    const db = await createDBAsync(":memory:");
    await initializeDBAsync(db);
    await signupAsync(db, user);
    assert.deepEqual(await runAsync(createApp(db), "POST", path), {
      status: 400,
      body: null,
    });
  });
});

describe("GET /signin", async () => {
  const path = `/signin/${user.email}/${user.password}`;
  it("should return 400 when user is missing", async () => {
    const db = await createDBAsync(":memory:");
    await initializeDBAsync(db);
    assert.deepEqual(await runAsync(createApp(db), "GET", path), {
      status: 400,
      body: null,
    });
  });
  it("should return 200 when user exists", async () => {
    const db = await createDBAsync(":memory:");
    await initializeDBAsync(db);
    await signupAsync(db, user);
    assert.deepEqual(await runAsync(createApp(db), "GET", path), {
      status: 200,
      body: user,
    });
  });
});
