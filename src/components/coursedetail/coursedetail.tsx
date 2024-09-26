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
import { auth } from "@/lib/auth"

export default async function CourseDetail({reviewAction, courseName}: {
  reviewAction: (data: ReviewDataSchema) => Promise<{ error?: boolean; message?: string, }>,
  courseName: string
}) {
  // Fetch reviews for this course
  const course = await fetch(`${process.env.API_ROOT}/api/findcourse/${courseName}`).then(res => res.json())
  const course_id = course[0].id
  const reviews = await fetch(`${process.env.API_ROOT}/api/reviews/${course_id}`).then(res => res.json());

  // Fetch user email
  const session = await auth()

  /* Check if user can review */
  let canReview = false;
  if (reviews.length === 0) {
    canReview = true;
  } else {
    console.log(reviews)
    reviews.forEach((review : { student : string })=> {
    if (review.student === session!.user!.id!) {
      canReview = false;
    }
  })
  }

  const professors = [{name: "No professors yet", reviewCount: 0}];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course information</CardTitle>
        <CardDescription>Last updated 2 days ago</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Course description */}
        <Description description={"Course description goes here"}/>

        {/* Rating stuff */}
        <Ratings/>

        {/* Professor list */}
        <Professors professors={professors}/>

        {/* Reviews list */}
        <Reviews reviews={reviews}/>

        {/* Review form */}
        <ReviewForm review={reviewAction} courseName={courseName} email={session!.user!.email!} canReview={canReview} />
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing all info on this course
        </div>
      </CardFooter>
    </Card>
  );
}
