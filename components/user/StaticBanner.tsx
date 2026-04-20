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
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden bg-slate-900 mt-[-100px]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${imageURL})` }} 
      />
      <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20 pt-[100px]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block mb-6 p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
          >
            <Icon size={32} className="text-blue-200" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed opacity-90 font-medium"
          >
            {desc}
          </motion.p>
        </div>
      </div>
    </div>
  );
}