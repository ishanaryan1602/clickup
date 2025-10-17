import jwt from "jsonwebtoken";

// Generate short-lived access token
export function generateAccessToken(user) {
  const payload = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_JWT_SECRET, { expiresIn: "1h" }); 
}

// Generate long-lived refresh token
export function generateRefreshToken(user) {
  const payload = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_JWT_SECRET, { expiresIn: "7d" });
}


// Verify (decode) a JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}
