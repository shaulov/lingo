"use client";

import {useState} from "react";
import {challengeOptions, challenges} from "@/db/schema";
import {Header} from "@/app/lesson/components/header";

type Props = {
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    initialHearts: number;
    initialPercentage: number;
    userSubscription: any; // TODO: replace with subscription DB type
};

export function Quiz({
    initialLessonId,
    initialLessonChallenges,
    initialHearts,
    initialPercentage,
    userSubscription,
}: Props) {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={userSubscription?.isActive}
            />
        </>
    );
}