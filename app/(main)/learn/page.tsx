import { redirect } from "next/navigation";
import { getUnits, getUserProgress } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./components/header";
import { Unit } from "./components/unit";
import { AppRoutes } from "@/const";

export default async function LearnPage() {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [
    userProgress,
    units,
  ] = await Promise.all([
    userProgressData,
    unitsData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect(AppRoutes.Courses);
  }

  return (
    <section className="flex gap-[48px] px-6">
      <h1 className="sr-only">Spanish course</h1>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        <ul>
          {units.map(unit => (
            <li key={unit.id} className="mb-10">
              <Unit
                id={unit.id}
                order={unit.order}
                title={unit.title}
                description={unit.description}
                lessons={unit.lessons}
                activeLesson={undefined}
                activeLessonPercentage={0}
              />
            </li>
          ))}
        </ul>
        <div className="h-[1999px]"></div>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </section>
  );
}