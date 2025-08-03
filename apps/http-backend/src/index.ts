import express from "express";
const app = express();

import { config } from "@repo/config/config";
const PORT = config.port || 5000;

import authRoutes from "./routes/auth.route";
app.use(express.json());

app.use("/api/user", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
