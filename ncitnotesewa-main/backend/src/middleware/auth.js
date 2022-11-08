import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
    let token = req.headers.token;
    if (token) {
        let validToken = jwt.verify(token, process.env.JWT_SECRET);
        if (validToken) {
            next();
        } else {
            return res.status(401).json({
                message: "Invalid token",
            });
        }
    } else {
        return res.status(401).json({
            message: "Token not found",
        });
    }

}