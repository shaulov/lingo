import { Loader as LoaderIcon } from "lucide-react";

export function Loader() {
  return (
    <div className="flex justify-center items-center px-8">
      <span className="sr-only">Loading...</span>
      <LoaderIcon className="h-5 w-5 text-muted-foreground animate-spin" />
    </div>
  );
}