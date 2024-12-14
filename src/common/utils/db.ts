import { PrismaClient } from "@prisma/client";

// use `db` in your application to read and write data in your DB
const db = new PrismaClient();
export default db;
