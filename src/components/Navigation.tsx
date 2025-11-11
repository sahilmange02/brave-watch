import { NavLink } from "@/components/NavLink";
import { Flame, LayoutDashboard, BarChart3, Settings } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="glass-strong border-b border-border-glass sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2.5 rounded-xl glow-primary shadow-lg">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold">
              Fire<span className="gradient-text">Guardian</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
              activeClassName="text-primary font-medium bg-primary/10 backdrop-blur-sm"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </NavLink>
            <NavLink
              to="/analytics"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
              activeClassName="text-primary font-medium bg-primary/10 backdrop-blur-sm"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Analytics</span>
            </NavLink>
            <NavLink
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
              activeClassName="text-primary font-medium bg-primary/10 backdrop-blur-sm"
            >
              <Settings className="h-4 w-4" />
              <span className="font-medium">Settings</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
