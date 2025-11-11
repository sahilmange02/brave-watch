import { Card } from "@/components/ui/card";
import { dummyFirefighters } from "@/data/dummyData";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const avgTemperature = dummyFirefighters.map((ff) => ({
    name: ff.id,
    temperature: ff.temperature,
  }));

  const flameDetection = [
    { name: "Flame Detected", value: dummyFirefighters.filter((ff) => ff.flameDetected).length },
    { name: "No Flame", value: dummyFirefighters.filter((ff) => !ff.flameDetected).length },
  ];

  const vitalSigns = dummyFirefighters.map((ff) => ({
    name: ff.id,
    heartRate: ff.heartRate,
    spo2: ff.spo2,
  }));

  const avgMQ2Trend = dummyFirefighters.map((ff, index) => ({
    time: `T-${dummyFirefighters.length - index}`,
    mq2: ff.mq2,
  }));

  const COLORS = ["hsl(var(--status-critical))", "hsl(var(--status-safe))"];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Analytics Overview</h2>
          <p className="text-muted-foreground">
            Aggregated metrics and insights across all firefighter units
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Average Temperature per Helmet</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={avgTemperature}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="temperature" fill="hsl(var(--chart-1))" name="Temperature (°C)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Flame Detection Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={flameDetection}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {flameDetection.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Vital Signs Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vitalSigns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="heartRate" fill="hsl(var(--chart-3))" name="Heart Rate" />
                  <Bar dataKey="spo2" fill="hsl(var(--chart-5))" name="SpO₂" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Average MQ2 Gas Level Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={avgMQ2Trend}>
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
                  dataKey="mq2"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="MQ2 (ppm)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
