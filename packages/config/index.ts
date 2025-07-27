import dotenv from "dotenv";
import { z } from "zod";
import path from "path";

// Load the .env file from the monorepo root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Define the schema for your environment variables
const envSchema = z.object({
    // DATABASE_URL: z.string().url(),
    // API_SECRET: z.string().min(1),
    // NEXT_PUBLIC_API_URL: z.string().url(),
    PORT: z.string().default("5000"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

console.log(envSchema);

// Parse and export the validated environment variables
export const config = envSchema.parse(process.env);
