import { NavLink } from "@/components/NavLink";
import { Flame, LayoutDashboard, BarChart3, Settings } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Flame className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">
              Fire<span className="text-primary">Guardian</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              end
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary font-medium"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink
              to="/analytics"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary font-medium"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </NavLink>
            <NavLink
              to="/settings"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary font-medium"
            >
              <Settings className="h-4 w-4" />
              Settings
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
