import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Vercel Backend Working");
});

export default app;