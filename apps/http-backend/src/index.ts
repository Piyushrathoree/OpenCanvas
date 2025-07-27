import express from "express";
const app = express();

import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

console.log(process.env.PORT, process.env.JWT_SECRET);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
