import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:grid" />
      <main className="h-full pt-[50px] lg:pt-0 lg:pl-[256px] bg-red-500">
        {children}
      </main>
    </>
  );
}