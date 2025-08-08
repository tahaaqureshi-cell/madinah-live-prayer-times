import { Capacitor } from '@capacitor/core';

export interface PrayerData {
  name: string;
  time: string;
  status: 'past' | 'current' | 'upcoming';
  arabic: string;
}

export class WidgetService {
  static async updateWidget(prayers: PrayerData[]) {
    if (!Capacitor.isNativePlatform()) {
      console.log('Widget update skipped - not on native platform');
      return;
    }

    try {
      // For Android widgets
      if (Capacitor.getPlatform() === 'android') {
        await this.updateAndroidWidget(prayers);
      }
      
      // For iOS widgets
      if (Capacitor.getPlatform() === 'ios') {
        await this.updateIOSWidget(prayers);
      }
    } catch (error) {
      console.error('Failed to update widget:', error);
    }
  }

  private static async updateAndroidWidget(prayers: PrayerData[]) {
    // Android widget data
    const currentPrayer = prayers.find(p => p.status === 'current');
    const nextPrayer = prayers.find(p => p.status === 'upcoming');
    
    const widgetData = {
      currentPrayer: currentPrayer?.name || 'No current prayer',
      currentTime: currentPrayer?.time || '',
      nextPrayer: nextPrayer?.name || 'No upcoming prayer',
      nextTime: nextPrayer?.time || '',
      lastUpdated: new Date().toLocaleTimeString()
    };

    // This would typically call native Android code
    console.log('Android widget data:', widgetData);
  }

  private static async updateIOSWidget(prayers: PrayerData[]) {
    // iOS widget data
    const currentPrayer = prayers.find(p => p.status === 'current');
    const nextPrayer = prayers.find(p => p.status === 'upcoming');
    
    const widgetData = {
      currentPrayer: currentPrayer?.name || 'No current prayer',
      currentTime: currentPrayer?.time || '',
      nextPrayer: nextPrayer?.name || 'No upcoming prayer', 
      nextTime: nextPrayer?.time || '',
      arabicCurrent: currentPrayer?.arabic || '',
      arabicNext: nextPrayer?.arabic || ''
    };

    // This would typically call native iOS code
    console.log('iOS widget data:', widgetData);
  }

  static async createShortcuts() {
    if (!Capacitor.isNativePlatform()) {
      console.log('Shortcuts creation skipped - not on native platform');
      return;
    }

    try {
      // Dynamic shortcuts for quick prayer access
      const shortcuts = [
        {
          id: 'current_prayer',
          shortLabel: 'Current Prayer',
          longLabel: 'View Current Prayer Time',
          icon: 'prayer_icon',
          data: { action: 'current_prayer' }
        },
        {
          id: 'next_prayer',
          shortLabel: 'Next Prayer',
          longLabel: 'View Next Prayer Time',
          icon: 'clock_icon',
          data: { action: 'next_prayer' }
        },
        {
          id: 'all_prayers',
          shortLabel: 'All Prayers',
          longLabel: 'View All Prayer Times',
          icon: 'mosque_icon',
          data: { action: 'all_prayers' }
        }
      ];

      console.log('Creating shortcuts:', shortcuts);
      // This would call native shortcut creation
    } catch (error) {
      console.error('Failed to create shortcuts:', error);
    }
  }
}