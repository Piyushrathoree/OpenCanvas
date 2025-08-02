import express from "express";
const app = express();

import { config } from "@repo/config/config";
const PORT = config.port || 5000;

console.log(config.port, config.jwtSecret);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
