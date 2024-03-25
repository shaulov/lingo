import { MobileSidebar } from "@/components/mobile-sidebar";

function MobileHeader() {
  return (
    <header className="fixed top-0 z-10 flex lg:hidden items-center h-[50px] w-full px-6 bg-green-500 border-b">
      <MobileSidebar />
    </header>
  );
}

export { MobileHeader };