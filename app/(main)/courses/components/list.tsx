"use client";

import { courses } from "@/db/schema";
import Card from "./card";

type ListProps = {
  courses: typeof courses.$inferSelect[];
  activeCourseId: number
}

function List({ courses, activeCourseId }: ListProps) {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 pt-6">
      {courses.map(course => (
        <li key={course.id}>
          <Card
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
            onClick={() => {}}
            disabled={false}
            active={activeCourseId === course.id}
          />
        </li>
      ))}
    </ul>
  );
}

export default List;