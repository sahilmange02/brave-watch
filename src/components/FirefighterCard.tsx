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
        "p-6 cursor-pointer transition-all hover:scale-[1.02] border-2",
        getStatusBgColor(status),
        isCritical && "glow-critical"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{data.name}</h3>
          <p className="text-sm text-muted-foreground">{data.id}</p>
        </div>
        <Badge className={cn("uppercase font-semibold", getStatusColor(status))}>
          {getStatusText(status)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Thermometer className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Temperature</p>
            <p className="text-lg font-semibold">{data.temperature}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-chart-2/10 p-2 rounded-lg">
            <Wind className="h-4 w-4 text-chart-2" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">MQ2 Gas</p>
            <p className="text-lg font-semibold">{data.mq2} ppm</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-lg",
            data.flameDetected ? "bg-status-critical/10" : "bg-status-safe/10"
          )}>
            <Flame className={cn(
              "h-4 w-4",
              data.flameDetected ? "text-status-critical" : "text-status-safe"
            )} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Flame</p>
            <p className={cn(
              "text-lg font-semibold",
              data.flameDetected ? "text-status-critical" : "text-status-safe"
            )}>
              {data.flameDetected ? "Detected" : "None"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-chart-3/10 p-2 rounded-lg">
            <Heart className="h-4 w-4 text-chart-3" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Heart Rate</p>
            <p className="text-lg font-semibold">{data.heartRate} bpm</p>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <div className="bg-chart-5/10 p-2 rounded-lg">
            <Activity className="h-4 w-4 text-chart-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">SpO₂ Level</p>
            <p className="text-lg font-semibold">{data.spo2}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FirefighterCard;
