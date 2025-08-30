import jwt from "jsonwebtoken";
const authenticateToken = (req, res, next) => {
    // const token = req.headers["authorization"]?.split(" ")[1];
    const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        console.log("No token provided");
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });     



};
export default authenticateToken;