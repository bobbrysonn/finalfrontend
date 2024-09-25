import BreadcrumbGuide from "@/components/breadcrumbguide";
import DepartmentCourseList from "@/components/departmentcourselist";
import CourseSearchList from "@/components/coursesearchlist";

export default function Page({
  params,
  searchParams,
}: {
  params: { query: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
        Course Search
      </h1>
      <div className="mb-4">
        <BreadcrumbGuide/>
      </div>
      <CourseSearchList query={params.query} />
    </main>
  )
}