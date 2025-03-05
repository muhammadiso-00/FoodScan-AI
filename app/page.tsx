import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, Zap, BarChart3, Leaf } from "lucide-react";
import GradientBackground from "@/components/gradient-background";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] relative">

      
      <section className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary">
            O'z ovqatingizni <span className="[text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)] text-sky-400 text-xl md:text-6xl leading-snug font-manrope font-extrabold">AI</span> bilan tahlil qiling
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-100">
            Ovqatingizning fotosuratini yuklang yoki nomini kiriting va sun'iy intellekt yordamida batafsil ozuqa ma'lumotlarini oling.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200">
            <Button asChild size="lg" className="text-lg bg-primary hover:bg-primary/90 hover:scale-105 transition-transform">
              <Link href="/analyze">
                Ovqatni tahlil qilish <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg bg-transparent dark:text-white border-white text-black hover:bg-white dark:hover:text-black hover:text-black hover:scale-105 transition-transform">
              <Link href="/login">Bepul ro'yxatdan o'tish</Link>
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up delay-300">
            <div className="bg-white/10 dark:bg-white/10 p-6 rounded-lg shadow-sm border border-white/20 hover:shadow-md transition-shadow backdrop-blur-sm">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit mx-auto animate-pulse-scale">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Tezkor tahlil</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bizning ilg'or AI texnologiyasi yordamida bir necha soniyada batafsil ozuqa ma'lumotlarini oling.
              </p>
            </div>
            <div className="bg-white/10 dark:bg-white/10 p-6 rounded-lg shadow-sm border border-white/20 hover:shadow-md transition-shadow backdrop-blur-sm">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit mx-auto animate-pulse-scale">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Jarayonni kuzatish</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Go'zal vizualizatsiyalar va tahlillar bilan ozuqa qabul qilishingizni vaqt o'tishi bilan kuzating.
              </p>
            </div>
            <div className="bg-white/10 dark:bg-white/10 p-6 rounded-lg shadow-sm border border-white/20 hover:shadow-md transition-shadow backdrop-blur-sm">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit mx-auto animate-pulse-scale">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Shaxsiy maslahatlar</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ovqatlanishingizni va umumiy sog'lig'ingizni yaxshilash uchun moslashtirilgan tavsiyalar oling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative">
        {/* Add gradient background for this section too - it will adapt to the theme */}
        <GradientBackground className="opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-fade-in-up text-gray-900 dark:text-white">
            U qanday ishlaydi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center animate-fade-in-up delay-100">
              <div className="bg-primary/10 rounded-full p-4 mb-6 hover:scale-110 transition-transform">
                <Utensils className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">1. Yuklang yoki kiriting</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ovqatingizning fotosuratini oling yoki tahlil qilmoqchi bo'lgan ovqatingiz nomini kiriting.
              </p>
            </div>
            <div className="flex flex-col items-center text-center animate-fade-in-up delay-200">
              <div className="bg-primary/10 rounded-full p-4 mb-6 hover:scale-110 transition-transform">
                <Zap className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">2. AI tahlili</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bizning ilg'or AI ovqatingizni tahlil qiladi va batafsil ozuqa ma'lumotlarini taqdim etadi.
              </p>
            </div>
            <div className="flex flex-col items-center text-center animate-fade-in-up delay-300">
              <div className="bg-primary/10 rounded-full p-4 mb-6 hover:scale-110 transition-transform">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">3. Kuzatish va yaxshilash</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Natijalaringizni saqlang, ozuqa qabul qilishingizni vaqt o'tishi bilan kuzating va shaxsiy tavsiyalar oling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-orange-white dark:bg-gradient-orange-black relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up text-gray-900 dark:text-white">
            O'z ozuqaviy safaringizni bugundan boshlang
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-gray-700 dark:text-gray-300 animate-fade-in-up delay-100">
            FoodScan AI yordamida minglab foydalanuvchilar bilan birga sog'lom ovqatlanish tanlovlarini qiling.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg bg-primary hover:bg-primary/90 hover:scale-105 transition-transform animate-fade-in-up delay-200">
            <Link href="/analyze">
              Hozir sinab ko'ring <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
