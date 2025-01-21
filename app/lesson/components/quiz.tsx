"use client";

import {useState, useTransition, useRef} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {challengeOptions, challenges} from "@/db/schema";
import {upsertChallengeProgress} from "@/actions/challenge-progress";
import {reduceHearts} from "@/actions/user-progress";
import {Header} from "./header";
import {QuestionBubble} from "./question-bubble";
import {Challenge} from "./challenge";
import {FinishQuiz} from "@/app/lesson/components/finish-quiz";
import {Footer} from "./footer";
import {
    ChallengeTypes,
    DEFAULT_HEART_COUNT,
    DEFAULT_ADDING_POINTS,
    ErrorMessages,
    QuizStatuses,
    AppRoutes
} from "@/const";
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
    const router = useRouter();

    const correctAudioRef = useRef<HTMLAudioElement | null>(null);
    const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);
    const [isPending, startTransition] = useTransition();

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex(challenge => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption, setSelectedOption] = useState<number | undefined>();
    const [status, setStatus] = useState<QuizStatus>(QuizStatuses.None);

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];
    const title = challenge?.type === ChallengeTypes.Assist ? "Select the correct meaning" : challenge?.question;
    const score = challenges.length * DEFAULT_ADDING_POINTS;

    console.log(challenge);

    const handleNext = () => {
        setActiveIndex(current => current + 1);
    };

    const handleSelect = (id: number) => {
        if (status !== QuizStatuses.None) return;

        setSelectedOption(id);
    };

    const handleContinue = () => {
        if (isPending || !selectedOption) return;

        if (status === QuizStatuses.Wrong) {
            setStatus(QuizStatuses.None);
            setSelectedOption(undefined);
            return;
        }

        if (status === QuizStatuses.Correct) {
            startTransition(() => {
                handleNext();
                setStatus(QuizStatuses.None);
                setSelectedOption(undefined);
            });

            return;
        }

        const correctOption = options.find(option => option.correct);

        if (!correctOption) return;

        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then(response => {
                        if (response?.error === ErrorMessages.Hearts) {
                            console.error("Missing hearts");
                            return;
                        }

                        if (correctAudioRef.current) {
                            correctAudioRef.current.play();
                        }

                        setStatus(QuizStatuses.Correct);
                        setPercentage(prev => prev + 100 / challenges.length);

                        if (initialPercentage === 100) {
                            setHearts(prev => Math.min(prev + 1, DEFAULT_HEART_COUNT));
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong. Please try again.");
                    });
            });
        } else {
            startTransition(() => {
               reduceHearts(challenge.id)
                   .then(response => {
                       if (response?.error === ErrorMessages.Hearts) {
                           console.error("Missing hearts");
                           return;
                       }

                       if (incorrectAudioRef.current) {
                           incorrectAudioRef.current.play();
                       }

                       setStatus(QuizStatuses.Wrong);

                       if (!response?.error) {
                           setHearts(prev => Math.max(prev - 1, 0));
                       }
                   })
                   .catch(() => {
                       toast.error("Something went wrong. Please try again.");
                   });
            });
        }
    };

    const handleFinishCheck = () => {
        router.push(AppRoutes.Learn);
    }

    if (!challenge) {
        return (
            <>
                <FinishQuiz score={score} hearts={hearts} />
                <Footer
                    lessonId={initialLessonId}
                    status={QuizStatuses.Completed}
                    onCheck={handleFinishCheck}
                />
            </>
        );
    }

    return (
        <>
            <audio ref={correctAudioRef} src="/sounds/correct.wav"/>
            <audio ref={incorrectAudioRef} src="/sounds/incorrect.wav"/>
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
                                <QuestionBubble question={challenge.question}/>
                            )}
                            <Challenge
                                options={options}
                                status={status}
                                selectedOption={selectedOption}
                                type={challenge.type}
                                disabled={isPending}
                                onSelect={handleSelect}
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer
                status={status}
                disable={isPending || !selectedOption}
                onCheck={handleContinue}
            />
        </>
    );
}