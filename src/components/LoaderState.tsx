// components/loader.tsx

import { Loader2 } from "lucide-react";

interface LoaderProps {
  title: string;
  description?: string;
}

const LoaderState: React.FC<LoaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col  w-full h-screen items-center justify-center py-10 text-center text-muted-foreground space-y-3">
      <div className="flex flex-col  shadow-2xl px-25 items-center justify-center rounded-2xl py-15 text-center text-muted-foreground space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <h2 className="text-lg font-medium">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground max-w-xs">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoaderState;
