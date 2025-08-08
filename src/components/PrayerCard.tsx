import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Sunset, Sun, Moon } from "lucide-react";

interface PrayerCardProps {
  name: string;
  time: string;
  status: 'past' | 'current' | 'upcoming';
  arabic: string;
  description: string;
}

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'fajr':
      return <Moon className="h-5 w-5" />;
    case 'dhuhr':
      return <Sun className="h-5 w-5" />;
    case 'asr':
      return <Sunset className="h-5 w-5" />;
    case 'maghrib':
      return <Sunset className="h-5 w-5" />;
    case 'isha':
      return <Moon className="h-5 w-5" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'current':
      return 'bg-prayer-active text-prayer-active-foreground shadow-prayer-card animate-glow';
    case 'upcoming':
      return 'bg-prayer-upcoming text-prayer-upcoming-foreground shadow-prayer-card';
    case 'past':
      return 'bg-prayer-past text-prayer-past-foreground';
    default:
      return 'bg-card text-card-foreground';
  }
};

export const PrayerCard = ({ name, time, status, arabic, description }: PrayerCardProps) => {
  return (
    <Card className={`p-6 transition-all duration-300 hover:scale-105 ${getStatusStyles(status)} animate-fade-in`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {getIcon(name)}
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        {status === 'current' && (
          <Badge variant="secondary" className="bg-islamic-gold text-islamic-gold-foreground">
            Current
          </Badge>
        )}
      </div>
      
      <div className="text-2xl font-bold mb-2">{time}</div>
      
      <div className="space-y-1">
        <div className="text-lg font-medium font-arabic" dir="rtl">
          {arabic}
        </div>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    </Card>
  );
};