import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Barbearia SaaS - Sistema de Agendamento",
  description: "Sistema completo de agendamento para barbearias",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col font-sans bg-[#05070C] text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
