import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/test.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "ponggg" });
});

//register routes
app.use("/api/test", testRoutes);

// Basic API info endpoint
app.get("/", (req, res) => {
  res.json({ 
    name: "OYO Clone API",
    version: "1.0.0",
    status: "running"
  });
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
