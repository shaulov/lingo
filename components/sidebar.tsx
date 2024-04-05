import Image from "next/image";
import Link from "next/link";
import { ClerkLoading, ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { SidebarItem } from "@/components/sidebar-item";
import { SidebarItems } from "@/const";

type SidebarProps = {
  className?: string;
};

function Sidebar({ className }: SidebarProps) {
  return (
    <nav
      className={cn(
        "lg:fixed inset-0 flex flex-col h-full lg:w-[256px] px-4 border-r-2",
        className,
      )}
    >
      <Link className="self-start flex items-center gap-x-3 pt-8 pl-4 pb-7" href="/learn">
        <Image src="/images/mascot.svg" width="40" height="40" alt="Logo" />
        <span className="text-2xl font-extrabold text-green-600 tracking-wide">
          Lingo
        </span>
      </Link>
      <ul className="flex flex-1 flex-col gap-y-2">
        {SidebarItems.map((item) => (
          <li key={item.id}>
            <SidebarItem
              label={item.label}
              iconSrc={item.iconSrc}
              href={item.href}
            />
          </li>
        ))}
      </ul>
      <div className="mt-auto p-4">
        <ClerkLoading>
          <Loader className="justify-start p-2" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </ClerkLoaded>
      </div>
    </nav>
  );
}

export { Sidebar };
