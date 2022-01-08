import { Database } from "sqlite3";

export const createDBAsync = (persistency: string): Promise<Database> =>
  new Promise((resolve, reject) => {
    const db = new Database(persistency, (error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve(db);
      }
    });
  });

export const initializeDBAsync = (db: Database) =>
  new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
        email TEXT NOT NULL PRIMARY KEY,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      )`,
      (error: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve(undefined);
        }
      }
    );
  });

export type auth = {
  email: string;
  password: string;
};

export type user = {
  email: string;
  password: string;
  name: string;
};

export const signinAsync = (db: Database, { email, password }: auth) =>
  new Promise((resolve, reject) => {
    db.get(
      "SELECT name FROM user WHERE email = ? AND password = ?;",
      email,
      password,
      (error: Error, result: undefined | { name: string }) => {
        if (error) {
          reject(error);
        } else if (result === undefined) {
          resolve(null);
        } else {
          resolve({ email, password, name: result.name });
        }
      }
    );
  });

export const signupAsync = (db: Database, { email, password, name }: user) =>
  new Promise((resolve) => {
    db.run(
      "INSERT INTO user (email, password, name) VALUES (?, ?, ?);",
      email,
      password,
      name,
      (error: Error) => {
        resolve(!error);
      }
    );
  });
