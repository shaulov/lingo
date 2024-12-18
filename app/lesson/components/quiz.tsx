"use client";

import {useState} from "react";
import {challengeOptions, challenges} from "@/db/schema";
import {Header} from "./header";
import {QuestionBubble} from "./question-bubble";
import {Challenge} from "./challenge";
import {Footer} from "./footer";
import {ChallengeTypes} from "@/const";
import {QuizStatus} from "@/types";

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
    initialLessonChallenges: challenges,
    initialHearts,
    initialPercentage,
    userSubscription,
}: Props) {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex(challenge => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption, setSelectedOption] = useState<number | undefined>();
    const [status, setStatus] = useState<QuizStatus>("none");

    const challenge = challenges[activeIndex];
    const options = challenge.challengeOptions ?? [];
    const title = challenge.type === ChallengeTypes.Assist ? "Select the correct meaning" : challenge.question;

    const handleSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    }

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={userSubscription?.isActive}
            />
            <main className="flex-1">
                <section className="flex items-center justify-center h-full">
                    <div className="flex flex-col gap-y-12 lg:min-h-[350px] lg:w-[600px] w-full lg:px-0 px-6">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === ChallengeTypes.Assist && (
                                <QuestionBubble question={challenge.question} />
                            )}
                            <Challenge
                                options={options}
                                status={status}
                                selectedOption={selectedOption}
                                type={challenge.type}
                                disabled={false}
                                onSelect={handleSelect}
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer
                status={status}
                disable={!selectedOption}
                onCheck={() => {}}
            />
        </>
    );
}