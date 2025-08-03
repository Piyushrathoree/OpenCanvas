import { Router } from "express";
import {
    DeleteUserAccount,
    GetUserProfile,
    LoginUser,
    RegisterUser,
    UpdateUserProfile,
} from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
const router: import("express").Router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/profile", authMiddleware, GetUserProfile);
router.put("/profile", authMiddleware, UpdateUserProfile);
router.delete("/account", authMiddleware, DeleteUserAccount);

export default router;
