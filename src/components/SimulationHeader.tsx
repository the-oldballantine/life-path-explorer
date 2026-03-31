import { Separator } from "@/components/ui/separator";

const SimulationHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
          AI Simulation Platform
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        Explore Alternate Paths
        <br />
        of Your Life
      </h1>
      <p className="text-muted-foreground text-base max-w-lg mx-auto">
        Make decisions and understand how different choices shape your future.
      </p>
      <Separator className="mt-8 bg-border/50" />
    </div>
  );
};

export default SimulationHeader;
