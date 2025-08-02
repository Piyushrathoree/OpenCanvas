
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const PORT = process.env.PORT || 5000;

export const config = {
    port: Number(PORT),
    jwtSecret: JWT_SECRET,
};
