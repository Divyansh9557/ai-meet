

import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center py-10 text-center text-muted-foreground space-y-3">
      <div className="flex flex-col shadow-2xl px-10 items-center justify-center rounded-2xl py-10 text-center text-muted-foreground space-y-3">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <h2 className="text-lg font-medium text-destructive">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground max-w-xs">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
