import jwt from "jsonwebtoken";

// Generate short-lived access token
export function generateAccessToken(user) {
  const payload = {
    user_id: user.user_id,
    username: user.name,
    email: user.email,
    role:user.role
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_JWT_SECRET, { expiresIn: "1m" }); 
}

// Generate long-lived refresh token
export function generateRefreshToken(user) {
  const payload = {
    user_id: user.user_id,
    username: user.name,
    email: user.email,
    role:user.role,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_JWT_SECRET, { expiresIn: "1d" });
}


// Verify (decode) a JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_JWT_SECRET);
  } catch (err) {
    return null;
  }
}
