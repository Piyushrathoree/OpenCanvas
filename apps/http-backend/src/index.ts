import express from "express";
const app = express();

import { config } from "@repo/config";
const PORT = config.PORT || 5000;

console.log(config.PORT, config.JWT_SECRET);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
