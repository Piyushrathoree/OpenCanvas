import { Router } from "express";
import {
    DeleteUserAccount,
    GetUserProfile,
    LoginUser,
    LogoutUser,
    RegisterUser,
    UpdateUserProfile,
} from "../controllers/auth.controller";
const router: import("express").Router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/profile", GetUserProfile);
router.put("/profile", UpdateUserProfile);
router.delete("/account", DeleteUserAccount);

export default router;
