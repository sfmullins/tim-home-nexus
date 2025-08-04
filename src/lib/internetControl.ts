// Internet access control system for TIM
export interface InternetStatus {
  isConnected: boolean;
  switchState: boolean; // Physical switch position
  allowInternet: boolean; // Software override
  lastStateChange: string;
}

export interface NetworkStats {
  uploadSpeed: number;
  downloadSpeed: number;
  latency: number;
  dataUsage: {
    today: number;
    thisMonth: number;
  };
}

class InternetControlManager {
  private readonly STATUS_KEY = 'tim-internet-status';
  private readonly STATS_KEY = 'tim-network-stats';
  private statusCallback?: (status: InternetStatus) => void;
  private pollInterval?: NodeJS.Timeout;

  constructor() {
    this.initializeStatus();
    this.startMonitoring();
  }

  private initializeStatus(): void {
    const stored = localStorage.getItem(this.STATUS_KEY);
    if (!stored) {
      const initialStatus: InternetStatus = {
        isConnected: false,
        switchState: false,
        allowInternet: false,
        lastStateChange: new Date().toISOString()
      };
      localStorage.setItem(this.STATUS_KEY, JSON.stringify(initialStatus));
    }
  }

  private startMonitoring(): void {
    // Poll GPIO state every 1 second
    this.pollInterval = setInterval(() => {
      this.checkGPIOState();
    }, 1000);
  }

  private async checkGPIOState(): Promise<void> {
    try {
      // In a real implementation, this would read from GPIO
      // For now, we'll simulate the switch state
      const currentStatus = this.getStatus();
      
      // Simulate switch reading (in production: read from GPIO pin)
      const switchState = this.simulateGPIORead();
      
      if (switchState !== currentStatus.switchState) {
        await this.updateInternetAccess(switchState);
      }
    } catch (error) {
      console.error('GPIO monitoring error:', error);
    }
  }

  private simulateGPIORead(): boolean {
    // This simulates reading from a physical switch
    // In production: use Node.js GPIO library to read actual pin state
    const stored = localStorage.getItem('tim-simulate-switch');
    return stored === 'true';
  }

  private async updateInternetAccess(allowInternet: boolean): Promise<void> {
    const status = this.getStatus();
    const newStatus: InternetStatus = {
      ...status,
      switchState: allowInternet,
      allowInternet,
      isConnected: allowInternet ? await this.testInternetConnection() : false,
      lastStateChange: new Date().toISOString()
    };

    localStorage.setItem(this.STATUS_KEY, JSON.stringify(newStatus));
    
    // Apply network rules (in production: call NetworkManager or iptables)
    await this.applyNetworkRules(allowInternet);
    
    // Notify listeners
    if (this.statusCallback) {
      this.statusCallback(newStatus);
    }
  }

  private async applyNetworkRules(allowInternet: boolean): Promise<void> {
    // In production: Execute network manager commands or iptables rules
    console.log(`Internet access ${allowInternet ? 'enabled' : 'disabled'}`);
    
    // Example commands that would be executed in production:
    // if (allowInternet) {
    //   exec('iptables -D OUTPUT -j DROP');
    //   exec('systemctl restart NetworkManager');
    // } else {
    //   exec('iptables -A OUTPUT -d 192.168.0.0/16 -j ACCEPT');
    //   exec('iptables -A OUTPUT -j DROP');
    // }
  }

  private async testInternetConnection(): Promise<boolean> {
    try {
      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      return true;
    } catch {
      return false;
    }
  }

  getStatus(): InternetStatus {
    const stored = localStorage.getItem(this.STATUS_KEY);
    return stored ? JSON.parse(stored) : {
      isConnected: false,
      switchState: false,
      allowInternet: false,
      lastStateChange: new Date().toISOString()
    };
  }

  async toggleInternet(): Promise<void> {
    const status = this.getStatus();
    await this.updateInternetAccess(!status.allowInternet);
  }

  async forceInternetOn(): Promise<void> {
    await this.updateInternetAccess(true);
    // Also simulate physical switch being turned on
    localStorage.setItem('tim-simulate-switch', 'true');
  }

  async forceInternetOff(): Promise<void> {
    await this.updateInternetAccess(false);
    // Also simulate physical switch being turned off
    localStorage.setItem('tim-simulate-switch', 'false');
  }

  onStatusChange(callback: (status: InternetStatus) => void): void {
    this.statusCallback = callback;
  }

  getNetworkStats(): NetworkStats {
    const stored = localStorage.getItem(this.STATS_KEY);
    return stored ? JSON.parse(stored) : {
      uploadSpeed: 0,
      downloadSpeed: 0,
      latency: 0,
      dataUsage: {
        today: 0,
        thisMonth: 0
      }
    };
  }

  destroy(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }
}

export const internetControl = new InternetControlManager();