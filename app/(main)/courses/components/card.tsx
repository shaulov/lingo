import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CardProps = {
  id: number;
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
}

function Card({ 
  id,
  title,
  imageSrc,
  onClick,
  disabled,
  active,
}: CardProps) {
  return (
    <article
      className={cn(
        "relative flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px] border-2 rounded-xl border-b-4 hover:bg-black/5 active:border-b-2",
        disabled && "opacity-50"
      )}
    >
      <div className="flex items-center justify-end w-full">
        {active && (
          <span className="flex items-center justify-center p-1.5 bg-green-600 rounded-md">
            <Check className="h-4 w-4 text-white stroke-[4]" />
          </span>
        )}
      </div>
      <Image
        className="object-cover border rounded-lg drop-shadow-md"
        src={imageSrc}
        width={94}
        height={70}
        alt={`${title} flag}`}
      />
      <h2 className="mt-3 font-bold text-neutral-700 text-center">
        <Button
          className="before:content-[''] before:absolute before:inset-0 before:w-full before:h-full"
          variant="ghost" 
          size="sm"
          onClick={() => onClick(id)}
        >
          {title}
        </Button>
      </h2>
    </article>
  );
}

export default Card;