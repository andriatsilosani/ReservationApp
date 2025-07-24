import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = (req, res, next) => {
    console.log("🔐 Authenticate middleware started");

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ No token provided");
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const jwtSecret = process.env.JWT_SECRET;

        const decoded = jwt.verify(token, jwtSecret);
        console.log("✅ Token verified", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("❌ Authentication error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
};
