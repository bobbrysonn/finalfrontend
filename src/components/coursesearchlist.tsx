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

export default async function CourseSearchList({ query }: { query: string}) {
  const data = await fetch(
    `${process.env.API_ROOT}/api/findcourse/${query}/`,
  );

  const courses: [Course] = await data.json();
  let decodedQuery: string;
  try {
    decodedQuery = decodeURIComponent(query)
  } catch (error) {
    console.error(error);
    decodedQuery = query;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{decodedQuery}</CardTitle>
        <CardDescription>
          View all courses for the search {decodedQuery}
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
                    <Link
                      href={`/departments/${code}/${number}?name=${rest.join(" ")}`}
                      className="hover:underline"
                    >
                      {`${code} ${number}`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/departments/${code}/${number}?name=${rest.join(" ")}`}
                      className="hover:underline"
                    >
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