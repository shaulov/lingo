import {redirect} from "next/navigation";
import {getLesson, getUserProgress} from "@/db/queries";
import {Quiz} from "@/app/lesson/components/quiz";
import {AppRoutes} from "@/const";

type Props = {
    params: {
        lessonId: number;
    }
}

export default async function LessonIdPage({ params }: Props) {
    const lessonData = getLesson(params.lessonId);
    const userProgressData = getUserProgress();

    const [lesson, userProgress] = await Promise.all([lessonData, userProgressData]);

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
            userSubscription={null} // TODO: add user subscription
        />
    );
}