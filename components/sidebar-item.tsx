"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SidebarItemProps = {
  label: string;
  iconSrc: string;
  href: string;
};

function SidebarItem({ label, iconSrc, href }: SidebarItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      className="justify-start w-full h-[52px]"
      variant={active ? "sidebarOutline" : "sidebar"}
      asChild
    >
      <Link href={href}>
        <Image
          className="me-5"
          src={iconSrc}
          width="32"
          height="32"
          alt={label}
        />
        {label}
      </Link>
    </Button>
  );
}

export { SidebarItem };
