import BreadcrumbGuide from "@/components/breadcrumbguide";
import {Course} from "@/lib/definitions";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

export default async function Page() {
    /* Fetch best courses */
    const resp = await fetch(`${process.env.API_ROOT}/api/courses/?best=30`);
    const courses: Course[] = await resp.json();

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
                Best Classes
            </h1>

            {/* Breadcrumb */}
            <div className="mb-4">
                <BreadcrumbGuide/>
            </div>

            {/* List of courses */}
            <ListBestCourses courses={courses}/>
        </main>
    );
}

function ListBestCourses({courses}: { courses: Course[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Best Classes</CardTitle>
                <CardDescription>
                    Viewing courses sorted by highest rating
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="hidden md:table-cell">Layup</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => {
                            const [code, number, ...rest] = course.title.split(" ");

                            return (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">
                                        <Link
                                            href={`/departments/${code}/${number}?name=${rest.join(
                                                " "
                                            )}`}
                                            className="hover:underline"
                                        >
                                            {`${code} ${number}`}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/departments/${code}/${number}?name=${rest.join(
                                                " "
                                            )}`}
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