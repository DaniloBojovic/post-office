import express from "express";
import cors from "cors";
import shipmentRoutes from "./routes/shipmentRoutes";
import postOfficeRoutes from "./routes/postOfficeRoutes";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/shipments", shipmentRoutes);
app.use("/post-offices", postOfficeRoutes);

app.get("/", (req, res) => {
  res.send("Post Office Backend API is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
