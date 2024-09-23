import BreadcrumbGuide from "@/components/breadcrumbguide";
import DepartmentCourseList from "@/components/departmentcourselist";

export default function Page({
  params,
  searchParams,
}: {
  params: { short_code: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
        {searchParams.departmentName}
      </h1>
      <div className="mb-4">
        <BreadcrumbGuide />
      </div>
      <DepartmentCourseList
        departmentName={searchParams.departmentName as string}
        departmentCode={params.short_code}
      />
    </main>
  );
}
