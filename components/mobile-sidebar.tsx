import { Menu } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <span className="sr-only">Open menu</span>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export { MobileSidebar };