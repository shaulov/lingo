"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import db from "@/db/drizzle";
import {challengeProgress, challenges, userProgress} from "@/db/schema";
import {getCourseById, getUserProgress, getUserSubscription} from "@/db/queries";
import {AppRoutes, DEFAULT_HEART_COUNT, ErrorMessages, POINTS_TO_REFILL} from "@/const";

const revalidatePaths = (lessonId?: number) => {
  revalidatePath(AppRoutes.Shop);
  revalidatePath(AppRoutes.Learn);
  revalidatePath(AppRoutes.Quests);
  revalidatePath(AppRoutes.Leaderboard);
  revalidatePath(`${AppRoutes.Lesson}/${lessonId}`);
}

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty");
  }

  const existingUsingProgress = await getUserProgress();

  if (existingUsingProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath(AppRoutes.Courses);
    revalidatePath(AppRoutes.Learn);
    redirect(AppRoutes.Learn);
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath(AppRoutes.Courses);
  revalidatePath(AppRoutes.Learn);
  redirect(AppRoutes.Learn);
}

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) throw new Error("Challenge not found");

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
        eq(challengeProgress.userId, userId),
        eq(challengeProgress.challengeId, challengeId),
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: ErrorMessages.Practice }

  if (!currentUserProgress) throw new Error("User progress not found");

  if (userSubscription?.isActive) return { error: ErrorMessages.Subscription };

  if (currentUserProgress.hearts === 0) return { error: ErrorMessages.Hearts };

  await db.update(userProgress).set({
    hearts: Math.max(currentUserProgress.hearts - 1, 0),
  }).where(eq(userProgress.userId, userId));

  revalidatePaths(challenge.lessonId);
}

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found");
  if (currentUserProgress.hearts === DEFAULT_HEART_COUNT) throw new Error("Hearts are already full");
  if (currentUserProgress.points < POINTS_TO_REFILL) throw new Error("Not enough points");

  await db.update(userProgress).set({
    hearts: DEFAULT_HEART_COUNT,
    points: currentUserProgress.points - POINTS_TO_REFILL,
  }).where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePaths();
}