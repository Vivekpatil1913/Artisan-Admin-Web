import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

// ✅ Add this (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// API routes
app.use("/api", routes);

export default app;