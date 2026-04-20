import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; 
import { LanguageProvider } from "@/context/LanguageContext"; 
import ClientLayout from "@/components/user/ClientLayout"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Website Kelurahan Wergu Wetan",
  description: "Website Resmi Pemerintah Kelurahan Wergu Wetan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <LanguageProvider>
          <Toaster 
            position="top-center" 
            toastOptions={{
              duration: 4000,
              style: { background: '#333', color: '#fff', borderRadius: '10px' },
              success: { style: { background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' } },
              error: { style: { background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' } },
            }}
          />

          {/* HANYA PANGGIL CLIENTLAYOUT SAJA */}
          {/* Jangan ada <TopBar /> atau <Navbar /> disini lagi */}
          
          <ClientLayout>
             {children}
          </ClientLayout>

        </LanguageProvider>
      </body>
    </html>
  );
}