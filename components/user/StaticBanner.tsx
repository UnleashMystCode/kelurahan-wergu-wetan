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
    <div className="relative mt-[-100px] min-h-[480px] flex w-full flex-col overflow-hidden bg-text-dark md:min-h-[500px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageURL})` }}
      />
      <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 pt-[200px] pb-16 text-center md:pt-[200px] md:pb-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 p-3 shadow-lg backdrop-blur-md md:mb-6 md:p-4"
          >
            <Icon className="text-blue-200 h-6 w-6 md:h-8 md:w-8" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-3 text-3xl leading-tight font-black tracking-tight text-white md:mb-6 md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-[14px] leading-relaxed font-medium text-blue-50 opacity-90 md:text-xl"
          >
            {desc}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
