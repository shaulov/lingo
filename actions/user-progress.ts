"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { getCourseById, getUserProgress } from "@/db/queries";
import { AppRoutes } from "@/const";

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

  // TODO: Enable when units and lessons are added
  // if (!course.units.length || !course.units[0].lessons.length) {
  //   throw new Error("Course is empty");
  // }

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