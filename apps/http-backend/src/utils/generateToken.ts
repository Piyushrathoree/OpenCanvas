import { jwt } from "@repo/common";
import { config } from "@repo/config";

export const generateToken = async (email: string) => {
    const token = jwt.sign({ email }, config.JWT_SECRET);
    if (!token) {
        throw new Error("Failed to generate token");
    }
    return token;
};
