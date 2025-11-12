import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, AlertTriangle } from "lucide-react";
import { getOverallStatus, getStatusColor, getStatusText } from "@/utils/statusHelpers";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { fetchHelmets } from "@/lib/api";

const generateHistoricalDataLocal = (id: string, current: any) => {
  const now = new Date();
  const history: any[] = [];
  for (let i = 30; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60000).toISOString();
    const variance = (Math.random() - 0.5) * 6;
    history.push({
      timestamp,
      temperature: Math.max(20, Math.min(100, (current.temperature ?? 30) + variance)),
      mq2: Math.max(0, (current.mq2 ?? current.mq2_value ?? 100) + Math.random() * 100 - 50),
      heartRate: Math.max(60, Math.min(180, (current.heartRate ?? 90) + Math.random() * 20 - 10)),
      spo2: Math.max(80, Math.min(100, (current.spo2 ?? 96) + Math.random() * 4 - 2)),
      flameDetected: Boolean(current.flame_detected ?? current.flameDetected ?? false),
    });
  }
  return { id, name: current.name || `Helmet ${id}`, history };
};

const FirefighterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firefighter, setFirefighter] = useState<any | null>(null);
  const [historicalData, setHistoricalData] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await fetchHelmets();
        const items = data.helmets || [];
        const found = items.find((it: any) => String(it.helmet_id || it.id) === String(id));
        if (!mounted) return;
        if (!found) {
          setFirefighter(null);
          return;
        }
        setFirefighter(found);

        if (found.history && Array.isArray(found.history)) {
          setHistoricalData({ id, name: found.name || `Helmet ${id}`, history: found.history });
        } else {
          setHistoricalData(generateHistoricalDataLocal(id || "unknown", found));
        }
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
  }, [id]);

  if (!firefighter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Firefighter Not Found</h2>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const status = getOverallStatus({
    id: firefighter.id,
    name: firefighter.name,
    temperature: firefighter.temperature ?? firefighter.temperature_current,
    mq2: firefighter.mq2 ?? firefighter.mq2_value,
    heartRate: firefighter.heartRate ?? firefighter.heart_rate,
    spo2: firefighter.spo2 ?? firefighter.spo2_value,
    flameDetected: Boolean(firefighter.flame_detected ?? firefighter.flameDetected),
  });

  const chartData = (historicalData?.history || []).map((point: any) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    temperature: point.temperature,
    mq2: point.mq2,
    heartRate: point.heartRate,
    spo2: point.spo2,
  }));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{firefighter.name}</h2>
              <p className="text-muted-foreground">{firefighter.id}</p>
            </div>
            <Badge className={cn("text-lg px-4 py-2 uppercase font-semibold", getStatusColor(status))}>
              {getStatusText(status)}
            </Badge>
          </div>

          <div className="flex gap-4">
            <Button className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              View Location
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Send Alert
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
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
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">MQ2 Gas Level</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
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
                  dataKey="mq2"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2) / 0.2)"
                  strokeWidth={2}
                  name="MQ2 (ppm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Vital Signs</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="heartRate"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  name="Heart Rate (bpm)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="spo2"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={2}
                  name="SpO₂ (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirefighterDetail;
