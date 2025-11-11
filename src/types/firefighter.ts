export interface FirefighterData {
  id: string;
  name: string;
  temperature: number;
  mq2: number;
  flameDetected: boolean;
  heartRate: number;
  spo2: number;
  timestamp?: string;
}

export interface FirefighterHistoricalData {
  id: string;
  name: string;
  history: {
    timestamp: string;
    temperature: number;
    mq2: number;
    heartRate: number;
    spo2: number;
    flameDetected: boolean;
  }[];
}

export type StatusLevel = "safe" | "warning" | "critical";
