import { cn } from "@/lib/utils";

type SidebarProps = {
  className?: string;
};

function Sidebar({ className }: SidebarProps) {
  return (
    <nav
      className={cn(
        "lg:fixed grid inset-0 h-full lg:w-[256px] px-4 bg-blue-500 border-r-2",
        className,
      )}
    >
      Sidebar
    </nav>
  );
}

export { Sidebar };
