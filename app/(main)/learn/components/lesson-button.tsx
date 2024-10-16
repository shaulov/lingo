"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLessonRightPosition } from "@/utils/get-indent-level";

import 'react-circular-progressbar/dist/styles.css';

type Props = { 
  id: number;
  index: number;
  totalCount: number;
  current?: boolean;
  locked?: boolean;
  percentage: number;
}

function LessonButton({ id, index, totalCount, current, locked, percentage }: Props) {
  const rightPosition = getLessonRightPosition(index);
  const isFirst = index === 0;
  const isLast = index === totalCount - 1;
  const isCompleted = !current && !locked;
  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <div
      className={cn(
        "relative h-[102px] w-[102px]",
        isFirst && !isCompleted ? 'mt-[60px]' : 'mt-[24px]',
      )}
      style={{ right: `${rightPosition}px` }}
    >
      <Link
        className="before:content-[''] absolute z-10 inset-0 block w-full h-full"
        href={href}
        aria-disabled={locked}
        style={{ pointerEvents: locked ? "none" : "auto" }}
      />
      {current ? (
        <div className="relative">
          <div className="absolute z-10 -top-6 left-2.5 px-3 py-2.5 font-bold uppercase text-green-500 bg-white border-2 rounded-xl animate-bounce tracking-wide">
            Start
            <span className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
          </div>
          <CircularProgressbarWithChildren
            value={Number.isNaN(percentage) ? 0 : percentage}
            styles={{
              path: {
                stroke: "#4ade80",
              },
              trail: {
                stroke: "e5e7eb",
              }
            }}
          >
            <Button
              className="h-[70px] w-[70px] border-b-8"
              size="rounded"
              variant={locked ? "locked" : "secondary"}
            >
              <Icon className={cn(
                "h-10 w-10",
                locked
                  ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                  : "fill-primary-foreground text-primary-foreground",
                isCompleted && "fill-none strole-[4]"
              )} />
            </Button>
          </CircularProgressbarWithChildren>
        </div>
      ) : (
        <Button
          className="h-[70px] w-[70px] border-b-8"
          size="rounded"
          variant={locked ? "locked" : "secondary"}
        >
          <Icon className={cn(
            "h-10 w-10",
            locked
              ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
              : "fill-primary-foreground text-primary-foreground",
            isCompleted && "fill-none strole-[4]"
          )} />
        </Button>
      )}
    </div>
  );
}

export { LessonButton };