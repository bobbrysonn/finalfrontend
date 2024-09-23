import BreadcrumbGuide from "@/components/breadcrumbguide";
import CourseList from "@/components/courselist";
import Header from "@/components/header";

export default function Department() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
          Course Catalog
        </h1>
        <div className="mb-4">
          <BreadcrumbGuide />
        </div>
        <CourseList />
      </main>
    </>
  );
}
