import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InfinityIcon } from "lucide-react";

type UserProgressProps = {
  activeCourse: Record<string, string>; //TODO: change on DB type
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

function UserProgress({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Button variant="ghost" asChild>
        <Link href="/courses">
          <Image
            src={activeCourse.imgSrc}
            width="32"
            height="32"
            alt={activeCourse.title}
          />
        </Link>
      </Button>
      <Button className="text-orange-500" variant="ghost" asChild>
        <Link href="/shop">
          <Image
            className="me-2"
            src="/images/icons/points.svg"
            width="28"
            height="28"
            alt="Points"
          />
          {points}
        </Link>
      </Button>
      <Button className="text-rose-500" variant="ghost" asChild>
        <Link href="/shop">
          <Image
            className="me-2"
            src="/images/icons/heart.svg"
            width="28"
            height="28"
            alt="Heart"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Link>
      </Button>
    </div>
  );
}

export { UserProgress };
