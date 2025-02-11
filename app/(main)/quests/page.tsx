import {redirect} from "next/navigation";
import Image from "next/image";
import {getUserProgress, getUserSubscription} from "@/db/queries";
import {Progress} from "@/components/ui/progress";
import {StickyWrapper} from "@/components/sticky-wrapper";
import {FeedWrapper} from "@/components/feed-wrapper";
import {UserProgress} from "@/components/user-progress";
import {AppRoutes, quests} from "@/const";

export default async function QuestsPage() {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription] = await Promise.all([userProgressData, userSubscriptionData]);

    const isPro = Boolean(userSubscription?.isActive);

    if (!userProgress || !userProgress.activeCourse) {
        redirect(AppRoutes.Courses);
    }

    return (
        <section className="flex gap-[48px] px-6">
            <FeedWrapper>
                <div className="flex flex-col items-center w-full">
                    <Image
                        src="/images/icons/quests.svg"
                        height={90}
                        width={90}
                        alt="Quests"
                    />
                    <h1 className="my-6 text-center font-bold text-neutral-800 text-2xl">Quests</h1>
                    <p className="mb-6 text-muted-foreground text-center text-lg">
                        Complete quests by earning points
                    </p>
                    <ul className="w-full">
                        {quests.map((quest, index) => {
                            const progress = (userProgress.points / quest.value) * 100;

                            return (
                                <li
                                    className="flex items-center gap-x-4 w-full p-4 border-t-2"
                                    key={quest.title}
                                >
                                    <Image src="/images/icons/points.svg" width={60} height={60} alt="Points" />
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-xl font-bold text-neutral-700">
                                            {quest.title}
                                        </p>
                                        <Progress className="h-3" value={progress} />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
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