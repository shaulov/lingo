import { redirect } from "next/navigation";
import {getUnits, getUserProgress, getCourseProgress, getLessonPercentage, getUserSubscription} from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./components/header";
import { Unit } from "./components/unit";
import { AppRoutes } from "@/const";

export default async function LearnPage() {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    courseProgress,
    lessonPercentage,
    units,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    courseProgressData,
    lessonPercentageData,
    unitsData,
    userSubscriptionData,
  ]);

  const isPro = Boolean(userSubscription?.isActive);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
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
                activeLesson={courseProgress.activeLesson}
                activeLessonPercentage={lessonPercentage}
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
          hasActiveSubscription={isPro}
        />
      </StickyWrapper>
    </section>
  );
}