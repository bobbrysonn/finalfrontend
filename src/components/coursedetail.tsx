"use client";
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
import { ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReviewForm from "@/components/reviewform";

export default function CourseDetail() {
  const [goodCount, setGoodCount] = useState(8);
  const [layupCount, setLayupCount] = useState(0);
  const professors = [
    { name: "Mark Cuban", reviewCount: 5 },
    { name: "Bill Gates", reviewCount: 3 },
    { name: "Williams Hayes", reviewCount: 2 },
    { name: "Jane Smith", reviewCount: 1 },
    { name: "Zipporah Jones", reviewCount: 0 },
  ];

  const reviews = [
    {
      professor: "Mark Cuban",
      rating: 5,
      term: "24F",
      review:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    },
    {
      professor: "Bill Gates",
      rating: 4,
      term: "21W",
      review:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.",
    },
    {
      professor: "Williams Hayes",
      rating: 3,
      term: "21W",
      review:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    },
    {
      professor: "Jane Smith",
      rating: 2,
      term: "21W",
      review:
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. ",
    },
    {
      professor: "Zipporah Jones",
      rating: 1,
      term: "23F",
      review:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. ",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course information</CardTitle>
        <CardDescription>Last updated 2 days ago</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold text-xl">Description</h4>
        <p className="text-[#333333] dark:text-muted-foreground">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur
        </p>

        {/* Rating stuff */}
        <div className="flex justify-between mx-auto max-w-3xl mt-6 md:mt-10">
          <Card className="max-w-60 w-full">
            <CardContent className="text-center p-4">
              <p className="text-4xl font-bold">{goodCount}</p>
              <p className="text-sm mb-2">said it was good</p>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setGoodCount((prev) => prev + 1)}
                  className="p-1 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                  aria-label="Increase good count"
                >
                  <ChevronUp className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onClick={() => setGoodCount((prev) => Math.max(0, prev - 1))}
                  className="p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                  aria-label="Decrease good count"
                >
                  <ChevronDown className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </CardContent>
          </Card>
          <Card className="max-w-60 w-full">
            <CardContent className="text-center p-4">
              <p className="text-4xl font-bold">{layupCount}</p>
              <p className="text-sm mb-2">called it a layup</p>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setLayupCount((prev) => prev + 1)}
                  className="p-1 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                  aria-label="Increase layup count"
                >
                  <ChevronUp className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onClick={() => setLayupCount((prev) => Math.max(0, prev - 1))}
                  className="p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                  aria-label="Decrease layup count"
                >
                  <ChevronDown className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professor list */}
        <h5 className="font-semibold mt-10 text-xl">Professors</h5>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Number of reviews</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {professors.map((professor) => (
              <TableRow key={professor.name}>
                <TableCell>
                  <Link href="#" className="hover:underline">
                    {professor.name}
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Badge>{professor.reviewCount}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Reviews list */}
        <h5 className="font-semibold mt-10 mb-2 text-xl">
          Reviews ({reviews.length})
        </h5>
        <Table>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.professor}>
                <TableCell>
                  <p>
                    <span className="font-semibold">
                      {review.term} with {review.professor}:
                    </span>{" "}
                    <span className="text-[#333333] dark:text-muted-foreground">
                      {review.review}
                    </span>
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Review form */}
        <h5 className="font-semibold mt-10 mb-2 text-xl">Leave a review</h5>
        <ReviewForm />
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing all info on this course
        </div>
      </CardFooter>
    </Card>
  );
}
