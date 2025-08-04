import { useState, useEffect } from 'react';
import { internetControl, InternetStatus, NetworkStats } from '@/lib/internetControl';

export const useInternetControl = () => {
  const [status, setStatus] = useState<InternetStatus>(internetControl.getStatus());
  const [stats, setStats] = useState<NetworkStats>(internetControl.getNetworkStats());

  useEffect(() => {
    // Set up status change listener
    internetControl.onStatusChange(setStatus);

    // Update stats periodically
    const statsInterval = setInterval(() => {
      setStats(internetControl.getNetworkStats());
    }, 5000);

    return () => {
      clearInterval(statsInterval);
    };
  }, []);

  const toggleInternet = async () => {
    await internetControl.toggleInternet();
  };

  const forceInternetOn = async () => {
    await internetControl.forceInternetOn();
  };

  const forceInternetOff = async () => {
    await internetControl.forceInternetOff();
  };

  return {
    status,
    stats,
    toggleInternet,
    forceInternetOn,
    forceInternetOff,
    isConnected: status.isConnected,
    allowInternet: status.allowInternet,
    switchState: status.switchState
  };
};