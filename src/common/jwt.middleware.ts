require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyJWT(
    req: { headers: { authorization: string }; auth: { userId: any } },
    res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            json: { (arg0: { error: unknown }): void; new (): any };
        };
    },
    next: () => void
) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err: any, decoded: { userId: any }) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }
            req.auth = { userId: decoded.userId };
            next();
        }
    );
}

module.exports = { verifyJWT };
export { verifyJWT };
