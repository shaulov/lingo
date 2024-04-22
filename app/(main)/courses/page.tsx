import { getCourses } from "@/db/queries";
import List from "./components/list";

export default async function CoursesPage() {
  const data = await getCourses();
  return (
    <section className="px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={data} activeCourseId={1} />
    </section>
  );
}