"use server";

import {revalidatePath} from "next/cache";
import {auth} from "@clerk/nextjs";
import {eq, and} from "drizzle-orm";
import db from "@/db/drizzle";
import {challengeProgress, challenges, userProgress} from "@/db/schema";
import {getUserProgress, getUserSubscription} from "@/db/queries";
import {AppRoutes, DEFAULT_HEART_COUNT, DEFAULT_ADDING_POINTS, ErrorMessages} from "@/const";

const revalidatePaths = (lessonId: number) => {
    revalidatePath(AppRoutes.Learn);
    revalidatePath(AppRoutes.Lesson);
    revalidatePath(AppRoutes.Quests);
    revalidatePath(AppRoutes.Leaderboard);
    revalidatePath(`${AppRoutes.Learn}/${lessonId}`);
};

export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = auth();

    if (!userId) throw new Error("Unauthorized");

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscription();

    if (!currentUserProgress) throw new Error("User progress not found");

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });

    if (!challenge) throw new Error("Challenge not found");

    const lessonId = challenge.lessonId;
    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if (currentUserProgress.hearts === 0 && !isPractice && !userSubscription?.isActive) {
        return { error: ErrorMessages.Hearts }
    }

    if (isPractice) {
        await db.update(challengeProgress).set({
           completed: true,
        }).where(eq(challengeProgress.id, existingChallengeProgress?.id));

        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, DEFAULT_HEART_COUNT),
            points: currentUserProgress.points + DEFAULT_ADDING_POINTS,
        }).where(eq(userProgress.userId, userId));

        revalidatePaths(lessonId);
        return;
    }

    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed: true,
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + DEFAULT_ADDING_POINTS,
    }).where(eq(userProgress.userId, userId));

    revalidatePaths(lessonId);
};