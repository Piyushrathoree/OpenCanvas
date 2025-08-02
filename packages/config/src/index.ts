import { z } from "zod";
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const PORT = process.env.PORT || 5000;

const envSchema = z.object({
    // DATABASE_URL: z.string().url(),
    // API_SECRET: z.string().min(1),
    // NEXT_PUBLIC_API_URL: z.string().url(),
    PORT: z.string().default("5000"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

export const env = envSchema.safeParse(process.env);
if (!env.success) {
    console.error("Invalid environment variables:", env.error.errors);
    throw new Error("Invalid environment variables");
}
export const config = {
    port: parseInt(env.data.PORT, 10),
    jwtSecret: env.data.JWT_SECRET,
};
