import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 lg:z-20 flex items-center mb-5 lg:mt-[-28px] pb-3 lg:pt-[28px] text-neutral-400 bg-white border-b-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/courses">
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
        </Link>
      </Button>
      <h2 className="mx-auto font-bold text-lg">
        {title}
      </h2>
    </header>
  );
}

export { Header };