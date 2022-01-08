import { strict as assert } from "assert";
import { Database } from "sqlite3";
import {
  createDBAsync,
  initializeDBAsync,
  signupAsync,
  signinAsync,
} from "../src/db";

const user = { email: "john.doe@mail", name: "john", password: "1234" };

describe("createDBAsync", () => {
  it("it should return a sqlite3.Database", async () => {
    const db = await createDBAsync(":memory:");
    assert.ok(db instanceof Database);
  });
});

describe("initializeDBAsync", () => {
  it("it should return undefined", async () => {
    const db = await createDBAsync(":memory:");
    assert.equal(await initializeDBAsync(db), undefined);
  });
});

describe("signupAsync", async () => {
  it("it should return true when email is unique", async () => {
    const db = await createDBAsync(":memory:");
    await initializeDBAsync(db);
    assert.equal(await signupAsync(db, user), true);
  });
  it("it should return false when email is duplicate", async () => {
    const db = await createDBAsync(":memory:");
    await initializeDBAsync(db);
    await signupAsync(db, user);
    assert.equal(await signupAsync(db, user), false);
  });
});

describe("signinAsync", async () => {
  it("it should return null when the email is missing", async () => {
    const db = await createDBAsync(":memory:");
    await initializeDBAsync(db);
    assert.equal(await signinAsync(db, user), null);
  });
  it("it should return null when the password does not match", async () => {
    const db = await createDBAsync(":memory:");
    await initializeDBAsync(db);
    await signupAsync(db, user);
    assert.equal(await signinAsync(db, { ...user, password: "5678" }), null);
  });
  it("it should return the user when login matches", async () => {
    const db = await createDBAsync(":memory:");
    await initializeDBAsync(db);
    await signupAsync(db, user);
    assert.deepEqual(await signinAsync(db, user), user);
  });
});
