import { redirect } from "next/navigation";
import { getUserProgress } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./components/header";
import { AppRoutes } from "@/const";

export default async function LearnPage() {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect(AppRoutes.Courses);
  }

  return (
    <section className="flex gap-[48px] px-6">
      <h1 className="sr-only">Spanish course</h1>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
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