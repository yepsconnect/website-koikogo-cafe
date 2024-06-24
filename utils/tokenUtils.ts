import jwt from "jsonwebtoken";

export function generateToken(userId: string, isAdmin: boolean) {
  const config = useRuntimeConfig();
  const token = jwt.sign({ userId, isAdmin }, config.TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return token;
}

export function verifyToken(token: string) {
  const config = useRuntimeConfig();
  const decoded = jwt.verify(token, config.TOKEN_SECRET);
  return decoded;
}
