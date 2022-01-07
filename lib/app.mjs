
import Express from "express";

export const createApp = () => {
  const app = Express();
  app.get("/user", (req, res) => {
    res.status(200).json({ name: "john" });
  });
  return app;
};

