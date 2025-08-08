import { useEffect } from 'react';
import { WidgetService, PrayerData } from '@/services/widgetService';

export const useWidgetSync = (prayers: PrayerData[]) => {
  useEffect(() => {
    // Update widget when prayer data changes
    WidgetService.updateWidget(prayers);
  }, [prayers]);

  useEffect(() => {
    // Create shortcuts on app initialization
    WidgetService.createShortcuts();
  }, []);

  // Update widget periodically (every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      WidgetService.updateWidget(prayers);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [prayers]);
};