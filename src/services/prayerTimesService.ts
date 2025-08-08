export interface PrayerTime {
  name: string;
  time: string;
  status: 'past' | 'current' | 'upcoming';
  arabic: string;
  description: string;
  timestamp: Date;
}

export interface PrayerTimesResponse {
  success: boolean;
  data?: {
    date: string;
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
    meta: {
      timezone: string;
    };
  };
  error?: string;
}

export class PrayerTimesService {
  private static readonly API_BASE = 'https://api.aladhan.com/v1';
  private static readonly CITY = 'Toronto';
  private static readonly COUNTRY = 'Canada';
  
  static async getCurrentPrayerTimes(): Promise<PrayerTime[]> {
    try {
      const today = new Date();
      const dateString = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      const response = await fetch(
        `${this.API_BASE}/timingsByCity/${dateString}?city=${this.CITY}&country=${this.COUNTRY}&method=2`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const result: PrayerTimesResponse = await response.json();
      
      if (!result.data) {
        throw new Error('Invalid API response format');
      }
      
      return this.formatPrayerTimes(result.data.timings);
    } catch (error) {
      console.error('Failed to fetch prayer times:', error);
      // Return fallback times if API fails
      return this.getFallbackPrayerTimes();
    }
  }
  
  private static formatPrayerTimes(timings: any): PrayerTime[] {
    const prayers = [
      {
        name: 'Fajr',
        apiTime: timings.Fajr,
        arabic: 'الفجر',
        description: 'Dawn prayer before sunrise'
      },
      {
        name: 'Dhuhr',
        apiTime: timings.Dhuhr,
        arabic: 'الظهر',
        description: 'Midday prayer when sun reaches zenith'
      },
      {
        name: 'Asr',
        apiTime: timings.Asr,
        arabic: 'العصر',
        description: 'Afternoon prayer before sunset'
      },
      {
        name: 'Maghrib',
        apiTime: timings.Maghrib,
        arabic: 'المغرب',
        description: 'Sunset prayer just after sunset'
      },
      {
        name: 'Isha',
        apiTime: timings.Isha,
        arabic: 'العشاء',
        description: 'Night prayer after twilight'
      }
    ];
    
    const now = new Date();
    
    return prayers.map((prayer, index) => {
      const prayerTime = this.parseApiTime(prayer.apiTime);
      const status = this.determinePrayerStatus(prayerTime, now, prayers.map(p => this.parseApiTime(p.apiTime)));
      
      return {
        name: prayer.name,
        time: this.formatTime(prayerTime),
        status,
        arabic: prayer.arabic,
        description: prayer.description,
        timestamp: prayerTime
      };
    });
  }
  
  private static parseApiTime(timeString: string): Date {
    // API returns time in "HH:MM" format in 24-hour
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
  
  private static formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
  
  private static determinePrayerStatus(
    prayerTime: Date, 
    currentTime: Date, 
    allPrayerTimes: Date[]
  ): 'past' | 'current' | 'upcoming' {
    const currentIndex = allPrayerTimes.findIndex(time => time.getTime() === prayerTime.getTime());
    const nextPrayerTime = allPrayerTimes[currentIndex + 1];
    
    if (currentTime < prayerTime) {
      return 'upcoming';
    }
    
    if (nextPrayerTime && currentTime >= prayerTime && currentTime < nextPrayerTime) {
      return 'current';
    }
    
    if (!nextPrayerTime && currentTime >= prayerTime) {
      return 'current';
    }
    
    return 'past';
  }
  
  private static getFallbackPrayerTimes(): PrayerTime[] {
    // Fallback prayer times if API fails
    const now = new Date();
    return [
      {
        name: "Fajr",
        time: "5:45 AM",
        status: "past" as const,
        arabic: "الفجر",
        description: "Dawn prayer before sunrise",
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 45)
      },
      {
        name: "Dhuhr", 
        time: "12:30 PM",
        status: "past" as const,
        arabic: "الظهر",
        description: "Midday prayer when sun reaches zenith",
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30)
      },
      {
        name: "Asr",
        time: "3:45 PM", 
        status: "current" as const,
        arabic: "العصر",
        description: "Afternoon prayer before sunset",
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 45)
      },
      {
        name: "Maghrib",
        time: "6:20 PM",
        status: "upcoming" as const,
        arabic: "المغرب", 
        description: "Sunset prayer just after sunset",
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 20)
      },
      {
        name: "Isha",
        time: "8:00 PM",
        status: "upcoming" as const,
        arabic: "العشاء",
        description: "Night prayer after twilight",
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0)
      }
    ];
  }
}