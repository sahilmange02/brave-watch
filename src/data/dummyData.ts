import { FirefighterData, FirefighterHistoricalData } from "@/types/firefighter";

export const dummyFirefighters: FirefighterData[] = [
  {
    id: "FF01",
    name: "John Doe",
    temperature: 45,
    mq2: 210,
    flameDetected: false,
    heartRate: 98,
    spo2: 96,
  },
  {
    id: "FF02",
    name: "Alex Smith",
    temperature: 62,
    mq2: 480,
    flameDetected: true,
    heartRate: 155,
    spo2: 89,
  },
  {
    id: "FF03",
    name: "Maria Garcia",
    temperature: 38,
    mq2: 120,
    flameDetected: false,
    heartRate: 85,
    spo2: 98,
  },
  {
    id: "FF04",
    name: "David Chen",
    temperature: 52,
    mq2: 350,
    flameDetected: false,
    heartRate: 110,
    spo2: 94,
  },
  {
    id: "FF05",
    name: "Sarah Johnson",
    temperature: 41,
    mq2: 180,
    flameDetected: false,
    heartRate: 92,
    spo2: 97,
  },
  {
    id: "FF06",
    name: "Michael Brown",
    temperature: 68,
    mq2: 520,
    flameDetected: true,
    heartRate: 165,
    spo2: 86,
  },
];

// Generate historical data for detail view
export const generateHistoricalData = (firefighter: FirefighterData): FirefighterHistoricalData => {
  const history = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60000).toISOString();
    const variance = Math.random() * 10 - 5;
    
    history.push({
      timestamp,
      temperature: Math.max(20, Math.min(100, firefighter.temperature + variance)),
      mq2: Math.max(0, firefighter.mq2 + Math.random() * 100 - 50),
      heartRate: Math.max(60, Math.min(180, firefighter.heartRate + Math.random() * 20 - 10)),
      spo2: Math.max(80, Math.min(100, firefighter.spo2 + Math.random() * 4 - 2)),
      flameDetected: Math.random() > 0.8 ? true : firefighter.flameDetected,
    });
  }
  
  return {
    id: firefighter.id,
    name: firefighter.name,
    history,
  };
};
