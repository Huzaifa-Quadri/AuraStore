import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI string not Found in ENV");
}

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV not Found in ENV");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not Found in ENV");
}
if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET not Found in ENV");
}

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const CLIENT_URL = process.env.CLIENT_URL;
const Frontend_PORT = process.env.Frontend_PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

export const config = {
  MONGO_URI,
  PORT,
  NODE_ENV,
  CLIENT_URL,
  Frontend_PORT,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRE,
};
