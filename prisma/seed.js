const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses seeding (pengisian data awal)...");

  // 1. Seed Akun Petugas Biasa
  const hashedPasswordAdmin = await bcrypt.hash("admin", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {
      passwordHash: hashedPasswordAdmin,
      role: "admin",
      namaLengkap: "Petugas Biasa"
    },
    create: {
      username: "admin",
      passwordHash: hashedPasswordAdmin,
      namaLengkap: "Petugas Biasa",
      role: "admin",
    },
  });
  console.log("✅ Akun Petugas Biasa (admin) berhasil disiapkan.");

  // 2. Seed Akun Super Admin
  const hashedPasswordSuper = await bcrypt.hash("superadmin", 10);
  await prisma.admin.upsert({
    where: { username: "superadmin" },
    update: {
      passwordHash: hashedPasswordSuper,
      role: "super",
      namaLengkap: "Super Administrator"
    },
    create: {
      username: "superadmin",
      passwordHash: hashedPasswordSuper,
      namaLengkap: "Super Administrator",
      role: "super",
    },
  });
  console.log("✅ Akun Super Admin (superadmin) berhasil disiapkan.");

  console.log("✨ Seeding selesai!");
}

main()
  .catch((e) => {
    console.error("Gagal melakukan seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
