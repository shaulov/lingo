import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between items-center w-full h-20 border-b-2 border-slate-200 px-4">
      <Link className="flex items-center gap-x-3" href="/">
        <Image src="/images/mascot.svg" width="40" height="40" alt="Logo" />
        <span className="text-2xl font-extrabold text-green-600 tracking-wide">
          Lingo
        </span>
      </Link>
      <Button variant="ghost" size="lg">
        Login
      </Button>
    </header>
  );
}

export { Header };
