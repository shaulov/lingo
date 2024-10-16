import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
}

function UnitBanner({ title, description }: Props) {
  return (
    <header className="flex items-center justify-between w-full p-5 text-white bg-green-500 rounded-xl">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Button
        className="hidden xl:flex border-2 border-b-4 active:border-b-2"
        size='lg'
        variant='secondary'
        asChild
      >
        <Link href="/lesson">
          <NotebookText className="mr-2" />
          Continue
        </Link>
      </Button>
    </header>
  );
}

export { UnitBanner };