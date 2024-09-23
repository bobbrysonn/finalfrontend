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

import type { Department } from "@/lib/definitions";
import Link from "next/link";

export default async function CourseList() {
  const data = await fetch(`${process.env.API_ROOT}/api/departments/`);
  const departments: [Department] = await data.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Departments</CardTitle>
        <CardDescription>
          View all departments and click to view courses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Department Name</TableHead>
              <TableHead className="hidden md:table-cell">
                Number of courses
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/departments/${department.short_name}?departmentName=${department.long_name}`}
                    className="hover:underline"
                  >
                    {department.short_name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/departments/${department.short_name}?departmentName=${department.long_name}`}
                    className="hover:underline"
                  >
                    {department.long_name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge>{department.course_count}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing all {departments.length} departments
        </div>
      </CardFooter>
    </Card>
  );
}
