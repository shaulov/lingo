import {redirect} from "next/navigation";
import Image from "next/image";
import {getUserProgress, getUserSubscription} from "@/db/queries";
import {StickyWrapper} from "@/components/sticky-wrapper";
import {FeedWrapper} from "@/components/feed-wrapper";
import {UserProgress} from "@/components/user-progress";
import {Items} from "./components/items";
import {AppRoutes} from "@/const";

export default async function ShopPage() {
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
                        src="/images/icons/shop.svg"
                        height={90}
                        width={90}
                        alt="Shop"
                    />
                    <h1 className="my-6 text-center font-bold text-neutral-800 text-2xl">Shop</h1>
                    <p className="mb-6 text-muted-foreground text-center text-lg">Spend your points on cool stuff.</p>
                    <Items
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={isPro}
                    />
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