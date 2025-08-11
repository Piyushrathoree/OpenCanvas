import { JWT } from "@repo/common/index";
import { config } from "@repo/config/config";

const checkAuth = (token: string): string | null => {
    const decodedToken = JWT.verify(token, config.jwtSecret);
    if (typeof decodedToken === "string") {
        return null;
    }
    if (!decodedToken || !decodedToken.userId) {
        return null;
    }
    return decodedToken.userId;
};
export default checkAuth;
