import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'calendar-event-alarm-clock-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
