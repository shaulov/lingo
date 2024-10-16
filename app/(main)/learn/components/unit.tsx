import { lessons, units } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: Array<typeof lessons.$inferSelect & {
    completed: boolean;
  }>;
  activeLesson?: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  };
  activeLessonPercentage: number;
}

function Unit({ 
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <ul className="relative flex items-center flex-col">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <li key={lesson.id}>
              <LessonButton
                id={lesson.id}
                index={index}
                totalCount={lessons.length}
                current={isCurrent}
                locked={isLocked}
                percentage={activeLessonPercentage}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export { Unit };