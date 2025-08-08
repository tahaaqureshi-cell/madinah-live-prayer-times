import { useState, useEffect } from 'react';
import { PrayerTime, PrayerTimesService } from '@/services/prayerTimesService';
import { useToast } from '@/components/ui/use-toast';

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchPrayerTimes = async () => {
    try {
      setIsLoading(true);
      const times = await PrayerTimesService.getCurrentPrayerTimes();
      setPrayerTimes(times);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch prayer times:', error);
      toast({
        title: "Update Failed",
        description: "Using cached prayer times",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  // Update prayer times every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPrayerTimes();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Update prayer statuses every minute
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setPrayerTimes(currentTimes => {
        const now = new Date();
        return currentTimes.map(prayer => {
          const allTimes = currentTimes.map(p => p.timestamp);
          const currentIndex = allTimes.findIndex(time => time.getTime() === prayer.timestamp.getTime());
          const nextPrayerTime = allTimes[currentIndex + 1];
          
          let status: 'past' | 'current' | 'upcoming';
          
          if (now < prayer.timestamp) {
            status = 'upcoming';
          } else if (nextPrayerTime && now >= prayer.timestamp && now < nextPrayerTime) {
            status = 'current';
          } else if (!nextPrayerTime && now >= prayer.timestamp) {
            status = 'current';
          } else {
            status = 'past';
          }
          
          return { ...prayer, status };
        });
      });
    }, 60 * 1000); // Every minute

    return () => clearInterval(statusInterval);
  }, []);

  return {
    prayerTimes,
    isLoading,
    lastUpdated,
    refetch: fetchPrayerTimes
  };
};