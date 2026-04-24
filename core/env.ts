import { z } from "zod";

const envSchema = z.object({
  // SEBELUMNYA: z.string().url(...) 
  // SEKARANG: Langsung pake z.url()
  DATABASE_URL: z.url({ 
    message: "❌ URL Database gak valid atau kosong di .env!" 
  }),
  
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("🚨 ADA MASALAH DI FILE .env:");

  const treeError = _env.error.flatten().fieldErrors;
  console.error(treeError);

  throw new Error("Tolong perbaiki file .env dulu bos!");
}

export const env = _env.data;