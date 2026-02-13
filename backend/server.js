import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import itemRoutes from "./routes/itemRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import truckRoutes from "./routes/truckRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import userRoutes from "./routes/tempUserRoutes.js";
dotenv.config();

const app = express();

app.use(cors({origin: true,
  credentials: true}));
app.use(express.json());
app.use("/api/items", itemRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/trips", tripRoutes); 
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
