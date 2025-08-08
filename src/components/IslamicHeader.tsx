import { Card } from "@/components/ui/card";
import mosqueHero from "@/assets/mosque-hero.jpg";

export const IslamicHeader = () => {
  return (
    <div className="relative mb-8">
      <div 
        className="h-64 rounded-lg bg-cover bg-center bg-gradient-mosque shadow-mosque"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${mosqueHero})` }}
      >
        <div className="h-full flex items-center justify-center text-center text-white px-6">
          <div className="animate-slide-up">
            <div className="text-4xl font-bold mb-2" dir="rtl">
              بسم الله الرحمن الرحيم
            </div>
            <h1 className="text-3xl font-bold mb-2">Madinah Masjid</h1>
            <p className="text-lg opacity-90">Prayer Times & Live Stream</p>
            <div className="mt-4 text-sm opacity-75">
              Jamiat-ul-Muslimin of Toronto
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};