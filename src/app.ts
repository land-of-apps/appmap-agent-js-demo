import express from "express";
import { Database } from "sqlite3";
import { signinAsync, signupAsync } from "./db";

export const createApp = (db: Database) => {
  const app = express();
  app.post("/signup/:email/:password/:name", async (req, res) => {
    res.status((await signupAsync(db, req.params)) ? 200 : 400).end();
  });
  app.get("/signin/:email/:password", async (req, res) => {
    const user = await signinAsync(db, req.params);
    if (user === null) {
      res.status(400).end();
    } else {
      res.status(200).json(user).end();
    }
  });
  return app;
};
