import { FirefighterData } from "@/types/firefighter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Wind, Flame, Heart, Activity } from "lucide-react";
import { getOverallStatus, getStatusColor, getStatusBgColor, getStatusText } from "@/utils/statusHelpers";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FirefighterCardProps {
  data: FirefighterData;
}

const FirefighterCard = ({ data }: FirefighterCardProps) => {
  const navigate = useNavigate();
  const status = getOverallStatus(data);
  const isCritical = status === "critical";

  return (
    <Card
      onClick={() => navigate(`/firefighter/${data.id}`)}
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border-2 group",
        "glass shimmer relative overflow-hidden",
        getStatusBgColor(status),
        isCritical && "glow-critical gradient-border"
      )}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-display font-semibold">{data.name}</h3>
            <p className="text-sm text-muted-foreground font-medium">{data.id}</p>
          </div>
          <Badge className={cn(
            "uppercase font-semibold px-3 py-1 shadow-lg backdrop-blur-sm",
            getStatusColor(status)
          )}>
            {getStatusText(status)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 glass-light p-3 rounded-lg group-hover:bg-white/5 transition-colors">
            <div className="bg-gradient-to-br from-primary to-primary-glow p-2.5 rounded-xl shadow-lg">
              <Thermometer className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Temperature</p>
              <p className="text-lg font-bold">{data.temperature}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-3 glass-light p-3 rounded-lg group-hover:bg-white/5 transition-colors">
            <div className="bg-gradient-to-br from-chart-2 to-green-400 p-2.5 rounded-xl shadow-lg">
              <Wind className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">MQ2 Gas</p>
              <p className="text-lg font-bold">{data.mq2} ppm</p>
            </div>
          </div>

          <div className="flex items-center gap-3 glass-light p-3 rounded-lg group-hover:bg-white/5 transition-colors">
            <div className={cn(
              "p-2.5 rounded-xl shadow-lg",
              data.flameDetected 
                ? "bg-gradient-to-br from-status-critical to-red-500" 
                : "bg-gradient-to-br from-status-safe to-green-400"
            )}>
              <Flame className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Flame</p>
              <p className={cn(
                "text-lg font-bold",
                data.flameDetected ? "text-status-critical" : "text-status-safe"
              )}>
                {data.flameDetected ? "Detected" : "None"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 glass-light p-3 rounded-lg group-hover:bg-white/5 transition-colors">
            <div className="bg-gradient-to-br from-chart-3 to-purple-400 p-2.5 rounded-xl shadow-lg">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Heart Rate</p>
              <p className="text-lg font-bold">{data.heartRate} bpm</p>
            </div>
          </div>

          <div className="flex items-center gap-3 glass-light p-3 rounded-lg col-span-2 group-hover:bg-white/5 transition-colors">
            <div className="bg-gradient-to-br from-chart-5 to-blue-300 p-2.5 rounded-xl shadow-lg">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">SpO₂ Level</p>
              <p className="text-lg font-bold">{data.spo2}%</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FirefighterCard;
