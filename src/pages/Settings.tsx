import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Settings</h2>
          <p className="text-muted-foreground">
            Configure your FireGuardian dashboard preferences
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Alert Thresholds</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="temp-threshold">Temperature Threshold (°C)</Label>
                <Input id="temp-threshold" type="number" defaultValue="60" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mq2-threshold">MQ2 Gas Threshold (ppm)</Label>
                <Input id="mq2-threshold" type="number" defaultValue="400" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hr-max-threshold">Max Heart Rate (bpm)</Label>
                <Input id="hr-max-threshold" type="number" defaultValue="150" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="spo2-threshold">Min SpO₂ Level (%)</Label>
                <Input id="spo2-threshold" type="number" defaultValue="90" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-alerts">Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                </div>
                <Switch id="email-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-alerts">SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                </div>
                <Switch id="sms-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sound-alerts">Sound Alerts</Label>
                  <p className="text-sm text-muted-foreground">Play sound for critical alerts</p>
                </div>
                <Switch id="sound-alerts" defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Data Refresh</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="refresh-rate">Refresh Rate (seconds)</Label>
                <Input id="refresh-rate" type="number" defaultValue="3" min="1" max="60" />
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
