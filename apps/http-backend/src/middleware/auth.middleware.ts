import { JWT, JwtPayload } from "@repo/common/index";
import { config } from "@repo/config/config";
import { Request, Response, NextFunction } from "express";

// Extend Express Request interface to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization!.split("")[1] || "";
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = JWT.verify(token, config.jwtSecret);
        if (!decoded || !(decoded as JwtPayload).userId) {
            return res.status(401).json({ message: "unauthorized" });
        }
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "something went wrong " });
    }
};

export default authMiddleware;
