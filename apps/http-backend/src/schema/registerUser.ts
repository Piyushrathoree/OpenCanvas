import z from "zod";

export const registerUserSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long.")
        .optional(),

    // Email: required string, must be a valid email format
    email: z.string().email("Invalid email address."),

    // Username: required string, 3-20 characters, alphanumeric only
    username: z
        .string()
        .min(3, "Username must be at least 3 characters long.")
        .max(20, "Username must be no more than 20 characters long.")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores."
        ),

    // Password: required string, at least 8 characters long
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
    // Email: required string, must be a valid email format
    email: z.string().email("Invalid email address.").optional(),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters long.")
        .max(20, "Username must be no more than 20 characters long.")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores."
        )
        .optional(),

    // Password: required string, at least 8 characters long
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
