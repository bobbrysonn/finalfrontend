import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Course } from "@/lib/definitions";

export default async function DepartmentCourseList({
  departmentCode,
}: {
  departmentName: string;
  departmentCode: string;
}) {
  const data = await fetch(
    `${process.env.API_ROOT}/api/department/${departmentCode}/`,
  );
  const courses: [Course] = await data.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{departmentCode}</CardTitle>
        <CardDescription>
          View all courses in the {departmentCode} department
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Rating</TableHead>
              <TableHead>Layup</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => {
              const [code, number, ...rest] = course.title.split(" ");

              return (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <Link href={""} className="hover:underline">
                      {`${code} ${number}`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={course.url} className="hover:underline">
                      {rest.join(" ")}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge>{course.rating}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{course.layup}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing all {courses.length} courses
        </div>
      </CardFooter>
    </Card>
  );
}
