import {redirect} from "next/navigation";
import Image from "next/image";
import {getTopUsers, getUserProgress, getUserSubscription} from "@/db/queries";
import {Separator} from "@/components/ui/separator";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {StickyWrapper} from "@/components/sticky-wrapper";
import {FeedWrapper} from "@/components/feed-wrapper";
import {UserProgress} from "@/components/user-progress";
import {AppRoutes} from "@/const";

export default async function LeaderboardPage() {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const topUsersData = getTopUsers();

    const [userProgress, userSubscription, topUsers] = await Promise.all([userProgressData, userSubscriptionData, topUsersData]);

    const isPro = Boolean(userSubscription?.isActive);

    if (!userProgress || !userProgress.activeCourse) {
        redirect(AppRoutes.Courses);
    }

    return (
        <section className="flex gap-[48px] px-6">
            <FeedWrapper>
                <div className="flex flex-col items-center w-full">
                    <Image
                        src="/images/icons/leaderboard.svg"
                        height={90}
                        width={90}
                        alt="Leaderboard"
                    />
                    <h1 className="my-6 text-center font-bold text-neutral-800 text-2xl">Leaderboard</h1>
                    <p className="mb-6 text-muted-foreground text-center text-lg">
                        See where you stand among other learners in the community.
                    </p>
                    <Separator className="h-0.5 mb-4 rounded-full" />
                    <ul className="w-full">
                        {topUsers.map((userProgress, index) => (
                            <li
                                key={userProgress.userId}
                                className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                            >
                                <p className="mr-4 font-bold text-lime-700">{index + 1}</p>
                                <Avatar className="w-12 h-12 ml-3 mr-6 bg-green-500 border">
                                    <AvatarImage
                                        className="object-cover"
                                        src={userProgress.userImageSrc}
                                    />
                                </Avatar>
                                <p className="flex-1 font-bold text-neutral-400">{userProgress.userName}</p>
                                <p className="text-muted-foreground">{userProgress.points} XP</p>
                            </li>
                        ))}
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