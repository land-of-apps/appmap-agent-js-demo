export const createUserTableAsync = (db) =>
  new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE user (
        email TEXT NOT NULL PRIMARY KEY,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      )`,
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(undefined);
        }
      }
    );
  });

export const signinAsync = (db, { email, password }) =>
  new Promise((resolve, reject) => {
    db.get(
      "SELECT name FROM user WHERE email = ? AND password = ?;",
      email,
      password,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result === undefined ? null : { name: result.name, email });
        }
      }
    );
  });

export const signupAsync = (db, { email, password, name }) =>
  new Promise((resolve) => {
    db.run(
      "INSERT INTO user (email, password, name) VALUES (?, ?, ?);",
      email,
      password,
      name,
      (error) => {
        resolve(!error);
      }
    );
  });
