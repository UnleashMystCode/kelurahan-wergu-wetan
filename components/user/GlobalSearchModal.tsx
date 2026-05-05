"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Store, Loader2, ArrowRight } from "lucide-react";
import { globalSearch, SearchResult } from "@/actions/search.action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fokus ke input saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Efek pencarian dengan debounce
  useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const data = await globalSearch(debouncedQuery);
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    }

    performSearch();
  }, [debouncedQuery]);

  // Handle navigasi via keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (item: SearchResult) => {
    onClose();
    if (item.type === "berita") {
      router.push(`/berita/${item.slug}`);
    } else if (item.type === "potensi") {
      router.push(`/potensi-desa/${item.slug}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-text-dark/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="pointer-events-none fixed inset-0 z-[101] flex items-start justify-center pt-24 px-4 sm:pt-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
            >
              {/* Search Header */}
              <div className="relative flex items-center border-b border-slate-100 px-6 py-4">
                <Search className="h-6 w-6 text-text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari berita, layanan, potensi desa..."
                  className="w-full bg-transparent px-2 sm:px-4 py-2 text-base sm:text-lg text-text-dark placeholder-slate-400 outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="mr-2 rounded-full p-1 text-text-muted hover:bg-slate-100 hover:text-text-muted"
                  >
                    <X size={16} />
                  </button>
                )}
                <div className="hidden items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-text-muted sm:flex">
                  <kbd>ESC</kbd>
                </div>
              </div>

              {/* Search Results Area */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {!query.trim() ? (
                  <div className="py-12 text-center">
                    <p className="text-sm font-medium text-text-muted">
                      Ketik sesuatu untuk memulai pencarian di portal Wergu Wetan.
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-brand-base" />
                  </div>
                ) : results.length > 0 ? (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.05 },
                      },
                    }}
                    className="flex flex-col gap-1"
                  >
                    {results.map((item) => (
                      <motion.button
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 },
                        }}
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-blue-50"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                              item.type === "berita"
                                ? "bg-blue-100 text-brand-base"
                                : "bg-emerald-100 text-emerald-600"
                            }`}
                          >
                            {item.type === "berita" ? <FileText size={20} /> : <Store size={20} />}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-text-dark group-hover:text-brand-dark line-clamp-1">
                              {item.judul}
                            </h4>
                            <div className="mt-0.5 flex items-center gap-2 text-xs font-medium text-text-muted">
                              <span
                                className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${
                                  item.type === "berita"
                                    ? "bg-blue-100 text-brand-dark"
                                    : "bg-emerald-100 text-emerald-700"
                                }`}
                              >
                                {item.type}
                              </span>
                              <span>•</span>
                              <span>{item.kategori}</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-base"
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-sm font-medium text-text-muted">
                      Tidak ada hasil yang ditemukan untuk <span className="font-bold text-text-dark">"{query}"</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Modal (Hidden on mobile) */}
              <div className="hidden sm:block border-t border-slate-100 bg-slate-50 px-6 py-3">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Pencarian Global Wergu Wetan</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-sans font-medium text-text-muted">
                        ↑
                      </kbd>
                      <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-sans font-medium text-text-muted">
                        ↓
                      </kbd>
                      Navigasi
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-sans font-medium text-text-muted">
                        ↵
                      </kbd>
                      Pilih
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
