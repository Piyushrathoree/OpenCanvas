import { Request, Response } from "express";
import { loginUserSchema, registerUserSchema } from "@repo/common/types";
import { ZodError } from "@repo/common/index";
import { PrismaClient } from "@repo/db/client";
import { hashPassword, comparePassword } from "@repo/common/hash";
import { JWT } from "@repo/common/index";
import { config } from "@repo/config/config";

const prisma = new PrismaClient();

const RegisterUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, username, password } = registerUserSchema.parse(
            req.body
        );
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email or username already exists.",
            });
        }
        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({ message: "Password hashing failed" });
        }
        const newUser = {
            name,
            email,
            username,
            password: hashedPassword,
        };

        const user = await prisma.user.create({ data: newUser });
        if (!user) {
            return res
                .status(500)
                .json({ message: "User registration failed" });
        }
        const token = JWT.sign(
            {
                userId: user.id,
                email: user.email,
            },
            config.jwtSecret
        );
        if (!token) {
            return res.status(500).json({ message: "Token generation failed" });
        }
        return res
            .status(201)
            .json({ message: "User registered successfully", token });
    } catch (error) {
        //  If validation fails, Zod throws an error
        if (error instanceof ZodError) {
            // Return a 400 Bad Request with the validation errors
            return res.status(400).json({ errors: error.flatten() });
        }
        // Handle other unexpected errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const LoginUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = loginUserSchema.parse(req.body);
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = JWT.sign(
        {
            userId: user.id,
            email: user.email,
        },
        config.jwtSecret
    );
    if (!token) {
        return res.status(500).json({ message: "Token generation failed" });
    }
    return res.status(200).json({ message: "Login successful", token });
};
const GetUserProfile = async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
};
const UpdateUserProfile = async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const { name, email, username } = req.body;
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email, username },
    });
    return res.status(200).json({ user: updatedUser });
};
const DeleteUserAccount = async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await prisma.user.delete({
        where: { id: userId },
    });
    return res.status(204).send();
};

export {
    RegisterUser,
    LoginUser,
    GetUserProfile,
    UpdateUserProfile,
    DeleteUserAccount,
};
