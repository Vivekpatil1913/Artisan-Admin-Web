
import express from "express";
import cors from "cors"; // ✅ ADD THIS
import routes from "./routes/index.js";

const app = express();

// ✅ ADD THIS BLOCK
app.use(cors({
  origin: "http://localhost:3000", // your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// API routes
app.use("/api", routes);

export default app;