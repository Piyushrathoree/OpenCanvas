import { JWT } from "@repo/common/index";
import { config } from "@repo/config/config";

export const generateToken = async (email: string) => {
    const token = JWT.sign({ email }, config.jwtSecret);
    if (!token) {
        throw new Error("Failed to generate token");
    }
    return token;
};
