import { Loader as LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type LoaderProps = {
  className?: string;
}

function Loader({ className }: LoaderProps) {
  return (
    <div className={
      cn(
        "flex justify-center items-center",
        className,
      )
    }>
      <span className="sr-only">Loading...</span>
      <LoaderIcon className="h-5 w-5 text-muted-foreground animate-spin" />
    </div>
  );
}

export { Loader };