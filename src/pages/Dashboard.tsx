import { useState, useEffect } from "react";
import FirefighterCard from "@/components/FirefighterCard";
import { FirefighterData } from "@/types/firefighter";
import { fetchHelmets } from "@/lib/api";

const mapServerToFirefighter = (item: any): FirefighterData => {
  // Server uses helmet_id and different names; map into the frontend's type
  const id = item.helmet_id || item.id || item.helmetId || "unknown";
  return {
    id: String(id),
    name: item.name || `Helmet ${id}`,
    temperature: item.temperature ?? item.temperature_current ?? item.temperature_value ?? 0,
    mq2: item.mq2 ?? item.mq2_value ?? item.mq2Value ?? 0,
    flameDetected: Boolean(item.flame_detected ?? item.flameDetected ?? false),
    heartRate: item.heartRate ?? item.heart_rate ?? item.heartrate ?? 0,
    spo2: item.spo2 ?? item.sp02 ?? 0,
    timestamp: item.timestamp ?? undefined,
  };
};

const Dashboard = () => {
  const [firefighters, setFirefighters] = useState<FirefighterData[]>([]);

  // Poll backend for live helmet data
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await fetchHelmets();
        if (!mounted) return;
        const items = (data.helmets || []).map(mapServerToFirefighter);
        setFirefighters(items);
      } catch (e) {
        console.error(e);
      }
    };

    load();
    const interval = setInterval(load, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
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
