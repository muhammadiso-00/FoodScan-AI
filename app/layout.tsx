import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";
import Navbar from "@/components/navbar";
import { Providers } from "@/components/providers";
import GradientBackground from "@/components/gradient-background";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // NextAuth config
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodScan AI - Track Your Nutrition",
  description: "Analyze your food with AI to get detailed nutritional information",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GradientBackground />
        <Providers session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

              <div className="min-h-screen flex flex-col justify-center">
                <Navbar />
                <main className="flex-1">{children}</main>
                <footer className="py-6 border-t">
                  <div className="container mx-auto px-4 text-center text-sm text-muted-foreground flex flex-col">
                    © {new Date().getFullYear()} FoodScan AI. Barcha huquqlar ximoyalangan. <span>Created by: <Link href={"https://muhammadiso.uz"}  className="text-blue-700 font-bold"><span>∞ CODER</span></Link></span>
                    
                  </div>
                </footer>
              </div>

            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
