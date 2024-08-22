"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { courses, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";
import Card from "./card";
import { AppRoutes } from "@/const";

type ListProps = {
  courses: typeof courses.$inferSelect[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
}

function List({ courses, activeCourseId }: ListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (id: number) => {
    if (isPending) return;

    if (id === activeCourseId) {
      return router.push(AppRoutes.Learn);
    }

    startTransition(() => {
      upsertUserProgress(id)
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 pt-6">
      {courses.map(course => (
        <li key={course.id}>
          <Card
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
            onClick={handleClick}
            disabled={isPending}
            active={activeCourseId === course.id}
          />
        </li>
      ))}
    </ul>
  );
}

export default List;