import { strict as assert } from "assert";
import sqlite3 from "sqlite3";
import {
  createUserTableAsync,
  signupAsync,
  signinAsync,
} from "../lib/user.mjs";

const user = { email: "john.doe@mail", name: "john", password: "1234" };

describe("createUserTable", () => {
  it("it should return undefined the first time", async () => {
    const db = new sqlite3.Database(":memory:");
    assert.equal(await createUserTableAsync(db), undefined);
  });
  it("it should fail the second time", async () => {
    const db = new sqlite3.Database(":memory:");
    await createUserTableAsync(db);
    await assert.rejects(createUserTableAsync(db), /SQLITE_ERROR/);
  });
});

describe("signupAsync", async () => {
  it("it should return true when email is unique", async () => {
    const db = new sqlite3.Database(":memory:");
    await createUserTableAsync(db);
    assert.equal(await signupAsync(db, user), true);
  });
  it("it should return false when email is duplicate", async () => {
    const db = new sqlite3.Database(":memory:");
    await createUserTableAsync(db);
    await signupAsync(db, user);
    assert.equal(await signupAsync(db, user), false);
  });
});

describe("signinAsync", async () => {
  it("it should return null when the email is missing", async () => {
    const db = new sqlite3.Database(":memory:");
    await createUserTableAsync(db);
    assert.equal(await signinAsync(db, user), null);
  });
  it("it should return null when the password does not match", async () => {
    const db = new sqlite3.Database(":memory:");
    await createUserTableAsync(db);
    await signupAsync(db, user);
    assert.equal(await signinAsync(db, { ...user, password: "5678" }), null);
  });
  it("it should return the user when login matches", async () => {
    const db = new sqlite3.Database(":memory:");
    await createUserTableAsync(db);
    await signupAsync(db, user);
    assert.deepEqual(await signinAsync(db, user), {
      name: user.name,
      email: user.email,
    });
  });
});
