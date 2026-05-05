const fs = require('fs');
const path = 'components/user/HomeView.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const startIdx = lines.findIndex(l => l.includes('{/* SEKSI 1: SAMBUTAN LURAH'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('{/* SEKSI 2: SOROTAN DESA'));

console.log('Start index:', startIdx);
console.log('End index:', endIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const newContent = `        {/* SEKSI 1: SAMBUTAN LURAH (PREMIUM INTERACTIVE LETTER STYLE) */}
        <section
          id="sambutan"
          className="flex scroll-mt-[100px] flex-col items-center justify-center py-16 md:py-24"
        >
          <div className="mx-auto w-full max-w-5xl px-0 md:px-6">
            {welcome ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(21,101,192,0.08)] md:p-16 lg:p-20"
              >
                {/* Ornamen Latar Belakang (Unik & Premium) */}
                <div className="pointer-events-none absolute -top-10 -left-10 text-slate-50 opacity-80">
                  <MessageSquareQuote size={280} className="-rotate-12" />
                </div>
                <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-gradient-to-br from-blue-50 to-transparent opacity-60 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-50 to-transparent opacity-60 blur-3xl"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon Quote Bouncing */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-base to-brand-dark text-white shadow-lg shadow-blue-500/30"
                  >
                    <MessageSquareQuote size={32} />
                  </motion.div>

                  {/* Judul dengan Font Lengkung (Rounded Sans) */}
                  <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-10 text-3xl font-extrabold tracking-tight text-text-dark md:text-5xl"
                    style={{ fontFamily: "'Nunito', 'Quicksand', 'Segoe UI Rounded', sans-serif" }}
                  >
                    Harapan dan Terima Kasih
                  </motion.h2>

                  {/* Teks Sambutan (Elegan & Rapi) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mx-auto max-w-4xl whitespace-pre-line text-justify text-[16px] leading-[2.2] font-medium text-slate-600 md:text-[17px] italic"
                  >
                    {welcome.konten}
                  </motion.div>

                  {/* Divider Elegan */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-14 mb-10 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
                  />

                  {/* Area Tanda Tangan & Nama */}
                  <div className="flex w-full flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                      className="mx-auto mb-4 flex w-full max-w-[280px] justify-center"
                    >
                      {welcome?.fotoURL ? (
                        <motion.div
                          animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"] }}
                          transition={{
                            duration: 3.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 4,
                          }}
                          className="flex w-full justify-center"
                        >
                          <img
                            src={welcome.fotoURL}
                            style={{ mixBlendMode: "multiply" }}
                            className="pointer-events-none w-full -rotate-2 transform object-contain opacity-80"
                            alt={\`Tanda Tangan \${welcome.namaLurah}\`}
                          />
                        </motion.div>
                      ) : (
                        /* Fallback: Tanda tangan cursive palsu jika admin belum meng-upload gambar TTD */
                        <motion.div
                          initial={isMounted ? { opacity: 0, scale: 0.9 } : false}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="mt-2 mb-4 -rotate-6 transform"
                        >
                          <span
                            className="text-5xl text-slate-800 drop-shadow-sm md:text-6xl"
                            style={{
                              fontFamily: "'Caveat', 'Dancing Script', 'Pacifico', cursive",
                            }}
                          >
                            {welcome.namaLurah.split(" ")[0] || "Lurah"}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-2xl font-black tracking-tight text-text-dark"
                      style={{ fontFamily: "'Nunito', 'Quicksand', 'Segoe UI Rounded', sans-serif" }}
                    >
                      {welcome?.namaLurah || "Bapak Lurah"}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="mt-1 text-[13px] font-bold tracking-widest text-brand-base uppercase"
                    >
                      Lurah Wergu Wetan
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-12 text-center text-text-muted">Data sambutan belum diisi.</div>
            )}
          </div>
        </section>
      </div>`;

  const before = lines.slice(0, startIdx);
  const after = lines.slice(endIdx - 1); // endIdx is where SEKSI 2 starts. But the div closed above it. Wait. Let's check `after`.
  
  lines.splice(startIdx, endIdx - startIdx - 1, newContent);
  fs.writeFileSync(path, lines.join('\n'));
  console.log('Fixed file.');
} else {
  console.log('Markers not found.');
}
