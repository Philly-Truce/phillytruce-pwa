import { PrismaClient } from "@prisma/client";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });
const prisma = new PrismaClient();
export default prisma;
