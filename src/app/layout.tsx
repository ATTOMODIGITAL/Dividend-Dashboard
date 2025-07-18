import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import SuggestionButton from "@/app/components/SuggestionButton/SuggestionButton";
import { AuthProvider } from "@/contexts/AuthContext";
import { FiltersProvider } from "@/contexts/FiltersContext";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { MainContentWrapper } from "./components/MainContentWrapper/MainContentWrapper";

import NavBar from "./components/NavBar/NavBar"; // Asumiendo que tienes un componente NavBar
import "./globals.css";
import { InterceptorInitializer } from "@/components/InterceptorInitializer";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ["400", "600"], // Definir los pesos de la fuente que necesitas
  subsets: ["latin"], // Si deseas un subconjunto de caracteres específicos, en este caso 'latin'
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dividend Refund Dashboard",
  description: "Dashboard para visualizar recuperación de dividendos",
  icons: {
    icon: "/favicon-dividend.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} bg-blanco h-screen `}
      >
        <AuthProvider>
          <InterceptorInitializer />
          <ScrollProvider>
            <FiltersProvider>
              <NavBar />
              <MainContentWrapper>{children}</MainContentWrapper>
              <div className="fixed bottom-10 right-8 z-50">
                <SuggestionButton />
              </div>
            </FiltersProvider>
          </ScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
