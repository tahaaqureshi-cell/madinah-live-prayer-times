import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.576d5cefab214897bcb70a1a5ce37b8a',
  appName: 'madinah-live-prayer-times',
  webDir: 'dist',
  server: {
    url: 'https://576d5cef-ab21-4897-bcb7-0a1a5ce37b8a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#158F5C",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    Shortcuts: {
      // Enable dynamic shortcuts
      enableDynamicShortcuts: true
    }
  }
};

export default config;