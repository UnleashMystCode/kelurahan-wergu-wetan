// lib/db.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Mengambil instance yang sudah ada di global atau membuat baru jika belum ada
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// Simpan ke global jika tidak dalam mode produksi agar tidak duplikasi saat hot-reload
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;