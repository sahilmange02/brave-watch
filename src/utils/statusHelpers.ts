import { FirefighterData, StatusLevel } from "@/types/firefighter";

export const getOverallStatus = (data: FirefighterData): StatusLevel => {
  // Critical conditions
  if (
    data.temperature > 60 ||
    data.mq2 > 400 ||
    data.flameDetected ||
    data.heartRate > 150 ||
    data.heartRate < 60 ||
    data.spo2 < 90
  ) {
    return "critical";
  }
  
  // Warning conditions
  if (
    data.temperature > 50 ||
    data.mq2 > 300 ||
    data.heartRate > 130 ||
    data.heartRate < 70 ||
    data.spo2 < 94
  ) {
    return "warning";
  }
  
  return "safe";
};

export const getStatusColor = (status: StatusLevel): string => {
  switch (status) {
    case "safe":
      return "text-status-safe";
    case "warning":
      return "text-status-warning";
    case "critical":
      return "text-status-critical";
  }
};

export const getStatusBgColor = (status: StatusLevel): string => {
  switch (status) {
    case "safe":
      return "bg-status-safe/10 border-status-safe/30";
    case "warning":
      return "bg-status-warning/10 border-status-warning/30";
    case "critical":
      return "bg-status-critical/10 border-status-critical/30";
  }
};

export const getStatusText = (status: StatusLevel): string => {
  switch (status) {
    case "safe":
      return "Safe";
    case "warning":
      return "Warning";
    case "critical":
      return "Critical";
  }
};
