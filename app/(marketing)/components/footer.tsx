import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/const";
import Image from "next/image";

function Footer() {
  return (
    <footer className="hidden lg:block w-full h-20 p-2 border-t-2 border-slate-200">
      <ul className="flex items-center justify-evenly">
        {LANGUAGES.map((lang) => (
          <li key={lang.id}>
            <Button variant="ghost" size="lg">
              <Image
                className="mr-4 rounded-md"
                src={lang.src}
                width="40"
                height="32"
                alt={lang.name}
              />
              {lang.name}
            </Button>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export { Footer };
