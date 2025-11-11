import { useState, useEffect } from "react";
import FirefighterCard from "@/components/FirefighterCard";
import { dummyFirefighters } from "@/data/dummyData";
import { FirefighterData } from "@/types/firefighter";

const Dashboard = () => {
  const [firefighters, setFirefighters] = useState<FirefighterData[]>(dummyFirefighters);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFirefighters((prev) =>
        prev.map((ff) => ({
          ...ff,
          temperature: Math.max(20, Math.min(100, ff.temperature + (Math.random() - 0.5) * 3)),
          mq2: Math.max(0, ff.mq2 + (Math.random() - 0.5) * 20),
          heartRate: Math.max(60, Math.min(180, ff.heartRate + (Math.random() - 0.5) * 5)),
          spo2: Math.max(80, Math.min(100, ff.spo2 + (Math.random() - 0.5) * 2)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-display font-bold mb-2 gradient-text">Live Monitoring</h2>
          <p className="text-muted-foreground text-lg">
            Real-time status of all firefighter helmets in the field
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {firefighters.map((firefighter, index) => (
            <div 
              key={firefighter.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in"
            >
              <FirefighterCard data={firefighter} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
