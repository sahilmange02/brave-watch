import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { dummyFirefighters } from "@/data/dummyData";
import { generateHistoricalData } from "@/data/dummyData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [selectedFirefighter, setSelectedFirefighter] = useState(dummyFirefighters[0].id);
  const [historicalData, setHistoricalData] = useState(() => {
    const ff = dummyFirefighters.find((f) => f.id === selectedFirefighter);
    return ff ? generateHistoricalData(ff) : null;
  });

  useEffect(() => {
    const firefighter = dummyFirefighters.find((ff) => ff.id === selectedFirefighter);
    if (firefighter) {
      setHistoricalData(generateHistoricalData(firefighter));
    }
  }, [selectedFirefighter]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHistoricalData((prev) => {
        if (!prev) return prev;
        
        const newHistory = [...prev.history];
        const lastPoint = newHistory[newHistory.length - 1];
        
        newHistory.shift();
        newHistory.push({
          timestamp: new Date().toISOString(),
          temperature: Math.max(20, Math.min(100, lastPoint.temperature + (Math.random() - 0.5) * 5)),
          mq2: Math.max(0, lastPoint.mq2 + (Math.random() - 0.5) * 50),
          heartRate: Math.max(60, Math.min(180, lastPoint.heartRate + (Math.random() - 0.5) * 10)),
          spo2: Math.max(80, Math.min(100, lastPoint.spo2 + (Math.random() - 0.5) * 3)),
          flameDetected: Math.random() > 0.9 ? !lastPoint.flameDetected : lastPoint.flameDetected,
        });

        return {
          ...prev,
          history: newHistory,
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!historicalData) {
    return <div>Loading...</div>;
  }

  const chartData = historicalData.history.map((point) => ({
    timestamp: new Date(point.timestamp).toLocaleTimeString(),
    temperature: point.temperature,
    mq2_value: point.mq2,
    heartRate: point.heartRate,
    spo2: point.spo2,
    flame_detected: point.flameDetected ? 1 : 0,
    alert_status: point.temperature > 60 || point.mq2 > 400 || point.flameDetected ? 1 : 0,
  }));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2 gradient-text">Individual Analytics</h2>
            <p className="text-muted-foreground text-lg">
              Detailed metrics and trends for selected firefighter
            </p>
          </div>

          <Select value={selectedFirefighter} onValueChange={setSelectedFirefighter}>
            <SelectTrigger className="w-[280px] glass-strong border-border-glass shadow-lg z-50 hover:border-primary/50 transition-all">
              <SelectValue placeholder="Select firefighter" />
            </SelectTrigger>
            <SelectContent className="glass-strong border-border-glass shadow-2xl z-50 backdrop-blur-xl">
              {dummyFirefighters.map((ff) => (
                <SelectItem 
                  key={ff.id} 
                  value={ff.id} 
                  className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-colors"
                >
                  {ff.name} ({ff.id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          <Card className="p-6 glass gradient-border shadow-2xl">
            <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-primary rounded-full"></div>
              Temperature Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="Temperature (°C)"
                  dot={{ fill: "hsl(var(--chart-1))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 glass gradient-border shadow-2xl">
            <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-chart-2 to-green-400 rounded-full"></div>
              MQ2 Gas Level
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="mq2_value"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2) / 0.2)"
                  strokeWidth={2}
                  name="MQ2 (ppm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 glass gradient-border shadow-2xl">
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                <div className="h-1 w-8 bg-gradient-to-r from-chart-3 to-purple-400 rounded-full"></div>
                Heart Rate Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="Heart Rate (bpm)"
                    dot={{ fill: "hsl(var(--chart-3))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 glass gradient-border shadow-2xl">
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                <div className="h-1 w-8 bg-gradient-to-r from-chart-5 to-blue-300 rounded-full"></div>
                SpO₂ Level Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="spo2"
                    stroke="hsl(var(--chart-5))"
                    strokeWidth={2}
                    name="SpO₂ (%)"
                    dot={{ fill: "hsl(var(--chart-5))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6 glass gradient-border shadow-2xl">
            <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-status-warning to-status-critical rounded-full"></div>
              Alert Status Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="flame_detected"
                  fill="hsl(var(--status-critical))"
                  name="Flame Detected"
                />
                <Bar
                  dataKey="alert_status"
                  fill="hsl(var(--status-warning))"
                  name="Alert Status"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
