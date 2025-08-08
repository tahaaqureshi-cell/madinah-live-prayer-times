import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrayerCard } from "@/components/PrayerCard";
import { LivestreamPlayer } from "@/components/LivestreamPlayer";
import { IslamicHeader } from "@/components/IslamicHeader";
import { Clock, Video } from "lucide-react";

const prayerTimes = [
  {
    name: "Fajr",
    time: "5:45 AM",
    status: "past" as const,
    arabic: "الفجر",
    description: "Dawn prayer before sunrise"
  },
  {
    name: "Dhuhr", 
    time: "12:30 PM",
    status: "past" as const,
    arabic: "الظهر",
    description: "Midday prayer when sun reaches zenith"
  },
  {
    name: "Asr",
    time: "3:45 PM", 
    status: "current" as const,
    arabic: "العصر",
    description: "Afternoon prayer before sunset"
  },
  {
    name: "Maghrib",
    time: "6:20 PM",
    status: "upcoming" as const,
    arabic: "المغرب", 
    description: "Sunset prayer just after sunset"
  },
  {
    name: "Isha",
    time: "8:00 PM",
    status: "upcoming" as const,
    arabic: "العشاء",
    description: "Night prayer after twilight"
  }
];

const Index = () => {
  const [currentTime] = useState(new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <IslamicHeader />
        
        <div className="text-center mb-6">
          <div className="text-sm text-muted-foreground mb-1">Current Time</div>
          <div className="text-2xl font-bold text-primary">{currentTime}</div>
        </div>

        <Tabs defaultValue="prayers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="prayers" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Prayer Times
            </TabsTrigger>
            <TabsTrigger value="livestream" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Live Stream
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prayers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {prayerTimes.map((prayer) => (
                <PrayerCard
                  key={prayer.name}
                  name={prayer.name}
                  time={prayer.time}
                  status={prayer.status}
                  arabic={prayer.arabic}
                  description={prayer.description}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Prayer times for Toronto, Canada • Times may vary slightly
              </p>
            </div>
          </TabsContent>

          <TabsContent value="livestream">
            <LivestreamPlayer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;