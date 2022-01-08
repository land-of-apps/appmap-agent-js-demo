import Express from "express";
import { signinAsync, signupAsync } from "./db.mjs";

export const createApp = (db) => {
  const app = Express();
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
