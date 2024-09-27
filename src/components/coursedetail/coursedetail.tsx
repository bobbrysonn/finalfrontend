import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Description from "@/components/coursedetail/description";
import ReviewForm from "@/components/coursedetail/reviewform";
import {ReviewDataSchema} from "@/lib/definitions";
import Professors from "@/components/coursedetail/professors";
import Reviews from "@/components/coursedetail/reviews";
import Ratings from "@/components/coursedetail/ratings";
import { SessionProvider } from "next-auth/react"

export default async function CourseDetail({reviewAction, courseName}: {
  reviewAction: (data: ReviewDataSchema) => Promise<{ error?: boolean; message?: string, }>,
  courseName: string
}) {
  // Fetch reviews for this course
  const reviews = await fetch(`${process.env.API_ROOT}/api/reviews/`).then(res => res.json());
  const course = await fetch(`${process.env.API_ROOT}/api/findcourse/${courseName}/`).then(res => res.json());
  const professors = [{name: "No professors yet", reviewCount: 0}];

  let description;
  if (course) {
    description = course[0].description;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course information</CardTitle>
        <CardDescription>Last updated 2 days ago</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Course description */}
        <Description description={description ? description : "Some"}/>

        {/* Rating stuff */}
        <Ratings/>

        {/* Professor list */}
        <Professors professors={professors}/>

        {/* Reviews list */}
        <Reviews reviews={reviews}/>

        {/* Review form */}
        <SessionProvider>
          <ReviewForm review={reviewAction} courseName={courseName}/>
        </SessionProvider>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing all info on this course
        </div>
      </CardFooter>
    </Card>
  );
}
