import { getCourses, getUserProgress } from "@/db/queries";
import List from "./components/list";

export default async function CoursesPage() {
  const coursesPromise = getCourses();
  const userProgressPromise = getUserProgress();

  const [courses, userProgress] = await Promise.all([coursesPromise, userProgressPromise]);

  return (
    <section className="px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </section>
  );
}