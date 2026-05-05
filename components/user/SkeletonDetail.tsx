"use client";

import { motion } from "framer-motion";

export default function SkeletonDetail() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HERO SKELETON */}
      <div className="relative flex min-h-[60vh] w-full flex-col justify-center bg-text-dark pb-12 pt-[140px] md:pt-[160px]">
        <div className="relative z-10 container mx-auto max-w-4xl px-4">
          {/* Back Button */}
          <div className="mb-8 h-10 w-48 rounded-full bg-text-dark animate-pulse" />
          
          {/* Badges / Date */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-6 w-28 rounded-full bg-text-dark animate-pulse" />
            <div className="h-6 w-32 rounded-full bg-text-dark animate-pulse" />
          </div>
          
          {/* Title */}
          <div className="mb-4 h-10 w-full max-w-2xl rounded-xl bg-text-dark animate-pulse md:h-14 lg:h-16" />
          <div className="mb-8 h-10 w-3/4 rounded-xl bg-text-dark animate-pulse md:h-14 lg:h-16" />
          
          {/* Author */}
          <div className="flex items-center gap-4 mt-8">
            <div className="h-12 w-12 rounded-full bg-text-dark animate-pulse" />
            <div>
              <div className="mb-2 h-4 w-32 rounded-full bg-text-dark animate-pulse" />
              <div className="h-3 w-48 rounded-full bg-text-dark/50 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT SKELETON */}
      <div className="container mx-auto max-w-4xl px-5 sm:px-6 pt-10 md:pt-16">
        <div className="mx-auto w-full max-w-3xl">
          {/* Paragraph 1 */}
          <div className="mb-4 h-4 w-full rounded-full bg-slate-200 animate-pulse" />
          <div className="mb-4 h-4 w-11/12 rounded-full bg-slate-200 animate-pulse" />
          <div className="mb-4 h-4 w-full rounded-full bg-slate-200 animate-pulse" />
          <div className="mb-10 h-4 w-4/5 rounded-full bg-slate-200 animate-pulse" />

          {/* Image Placeholder */}
          <div className="mb-10 h-64 w-full rounded-xl bg-slate-200 animate-pulse md:h-96" />

          {/* Paragraph 2 */}
          <div className="mb-4 h-4 w-full rounded-full bg-slate-200 animate-pulse" />
          <div className="mb-4 h-4 w-10/12 rounded-full bg-slate-200 animate-pulse" />
          <div className="mb-4 h-4 w-full rounded-full bg-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
