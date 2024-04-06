import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./components/header";

export default function LearnPage() {
  return (
    <section className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title="Spanish" />
        <div className="h-[1999px]"></div>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Spanish", imgSrc: "/images/flags/es.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </section>
  );
}