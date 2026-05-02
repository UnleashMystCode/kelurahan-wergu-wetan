"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type StaticBannerProps = {
  title: string;
  desc: string;
  imageURL: string;
  Icon: LucideIcon;
};

export default function StaticBanner({ title, desc, imageURL, Icon }: StaticBannerProps) {
  return (
    <div className="relative mt-[-100px] h-[400px] w-full overflow-hidden bg-slate-900 md:h-[480px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageURL})` }}
      />
      <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 pt-[140px] md:pt-[160px] text-center">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-md"
          >
            <Icon size={32} className="text-blue-200" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 text-4xl leading-tight font-black tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-blue-50 opacity-90 md:text-xl"
          >
            {desc}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
