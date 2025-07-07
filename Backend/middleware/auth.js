import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not authorized. Please login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id; // set userId for controllers
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.json({ success: false, message: "Invalid or expired token." });
  }
};

export { authMiddleware };
