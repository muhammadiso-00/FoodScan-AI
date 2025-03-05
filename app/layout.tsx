import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import { Providers } from "@/components/providers";
import GradientBackground from "@/components/gradient-background";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FoodScan AI - AI-Powered Nutrition Tracker",
    description: "Use AI to analyze your meals and get detailed nutritional information instantly. Track your diet and stay healthy with FoodScan AI!",
    keywords: ["AI nutrition analysis", "food scanner", "diet tracking", "calorie counter", "health app"],
    openGraph: {
        title: "FoodScan AI - AI-Powered Nutrition Tracker",
        description: "Analyze your meals with AI and get accurate nutritional insights.",
        type: "website",
        url: "https://foodscan-ai.vercel.app",
        images: [{ url: "https://foodscan.ai/og-image.jpg", width: 1200, height: 630, alt: "FoodScan AI Preview" }],
    },
    twitter: {
        card: "summary_large_image",
        site: "@FoodScanAI",
        title: "FoodScan AI - AI-Powered Nutrition Tracker",
        description: "AI-powered food analysis for better health.",
        images: "https://foodscan.ai/twitter-card.jpg",
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en" suppressHydrationWarning>
            <Head>
                <link rel="canonical" href="https://foodscan-ai.vercel.app" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Muhammadiso.uz" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "FoodScan AI",
                        "url": "https://foodscan-ai.vercel.app",
                        "description": "AI-powered food analysis and nutrition tracking application.",
                        "image": "https://foodscan.ai/logo.png",
                        "applicationCategory": "Health & Fitness",
                    })}
                </script>
            </Head>
            <body className={inter.className}>
                <GradientBackground />
                <Providers session={session}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <div className="min-h-screen flex flex-col justify-center">
                            <Navbar />
                            <main className="flex-1">{children}</main>
                            <footer className="py-6 border-t">
                                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground flex flex-col">
                                    © {new Date().getFullYear()} FoodScan AI. All rights reserved.
                                    <span>
                                        Created by:
                                        <Link href="https://muhammadiso.uz" className="text-blue-700 font-bold">
                                            ∞ CODER
                                        </Link>
                                    </span>
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
