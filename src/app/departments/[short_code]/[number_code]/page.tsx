import BreadcrumbGuide from "@/components/breadcrumbguide";
import CourseDetail from "@/components/coursedetail/coursedetail";
import { createReview } from "@/actions/reviews";

export default async function Page({
  params,
  searchParams,
}: {
  params: { short_code: string; number_code: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
        {params.short_code} {params.number_code}: {searchParams.name}
      </h1>
      <div className="mb-4">
        <BreadcrumbGuide />
      </div>
      <CourseDetail
        reviewAction={createReview}
        courseName={`${params.short_code} ${params.number_code} ${searchParams.name}`}
      />
    </main>
  );
}

/*
<div className="max-w-3xl mx-auto p-4 space-y-6">
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl font-bold">
        AAAS007.01: Postcolonial Dialogues
      </CardTitle>
      <p className="text-sm text-muted-foreground">Last offered 21S</p>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex justify-between">
        <Card className="w-[48%]">
          <CardContent className="text-center p-4">
            <p className="text-4xl font-bold">8</p>
            <p className="text-sm">said it was good</p>
          </CardContent>
        </Card>
        <Card className="w-[48%]">
          <CardContent className="text-center p-4">
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm">called it a layup</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Medians</h3>
        <div className="h-32 bg-green-800 relative">
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-white text-xs p-1">
            <span>A</span>
            <span>A-</span>
            <span>B+</span>
            <span>B</span>
            <span>B-</span>
            <span>C+</span>
            <span>C</span>
            <span>C-</span>
            <span>D</span>
          </div>
          <div className="absolute bottom-0 right-0 text-white text-xs p-1">
            21S
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Professors</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Reviews</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-blue-600">Ayo Coly</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</div>
*/
