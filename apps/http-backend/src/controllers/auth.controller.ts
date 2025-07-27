import express, { Request, Response } from "express";
import { registerUserSchema } from "../schema/registerUser";
import { ZodError } from "zod";

const RegisterUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, username, password } = registerUserSchema.parse(
            req.body
        );
        const existingUser = false; // Replace with actual user existence check logic
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email or username already exists.",
            });
        }

        const newUser = {
            name,
            email,
            username,
            password, // In a real application, ensure to hash the password before saving
        };
    } catch (error) {
        // 3. If validation fails, Zod throws an error
        if (error instanceof ZodError) {
            // Return a 400 Bad Request with the validation errors
            return res.status(400).json({ errors: error.flatten() });
        }

        // Handle other unexpected errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const LoginUser = (req: Request, res: Response): any => {};
const LogoutUser = (req: Request, res: Response): any => {};
const GetUserProfile = (req: Request, res: Response): any => {};
const UpdateUserProfile = (req: Request, res: Response): any => {};
const DeleteUserAccount = (req: Request, res: Response): any => {};

export {
    RegisterUser,
    LoginUser,
    LogoutUser,
    GetUserProfile,
    UpdateUserProfile,
    DeleteUserAccount,
};
