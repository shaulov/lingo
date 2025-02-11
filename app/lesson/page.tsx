import {redirect} from "next/navigation";
import {getLesson, getUserProgress, getUserSubscription} from "@/db/queries";
import {Quiz} from "@/app/lesson/components/quiz";
import {AppRoutes} from "@/const";

export default async function LessonPage() {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [lesson, userProgress, userSubscription] = await Promise.all([lessonData, userProgressData, userSubscriptionData]);

    if (!lesson || !userProgress) {
        redirect(AppRoutes.Learn);
    }

    const initialPercentage = lesson?.challenges.filter(challenge => challenge.completed).length / lesson?.challenges.length * 100;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={userSubscription}
        />
    );
}