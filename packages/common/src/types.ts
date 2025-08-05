import z from "zod";

export const registerUserSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long.")
        .optional(),

    // Email: required string, must be a valid email format
    email: z.string().email("Invalid email address."),

    // Password: required string, at least 8 characters long
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const loginUserSchema = z.object({
    // Email: required string, must be a valid email format
    email: z.string().email("Invalid email address.").optional(),
    // Password: required string, at least 8 characters long
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const updateUserProfileSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long.")
        .optional(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .optional(),
});

export const createRoom = z.object({
    name: z.string().min(1, "Room name is required."),
    description: z.string().optional(),
});
