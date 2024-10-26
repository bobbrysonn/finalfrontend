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
import { ReviewDataSchema } from "@/lib/definitions";
import Professors from "@/components/coursedetail/professors";
import Reviews from "@/components/coursedetail/reviews";
import Ratings from "@/components/coursedetail/ratings";
import { auth } from "@/lib/auth";

export default async function CourseDetail({
  reviewAction,
  courseName,
}: {
  reviewAction: (
    data: ReviewDataSchema
  ) => Promise<{ error?: boolean; message?: string }>;
  courseName: string;
}) {
  // Fetch reviews for this course
  const course = await fetch(
    `${process.env.API_ROOT}/api/courses?title=${courseName}`
  ).then((res) => res.json());
  const course_id = course[0].id;
  const reviews = await fetch(
    `${process.env.API_ROOT}/api/reviews/${course_id}`
  ).then((res) => res.json());

  // Fetch user email
  const session = await auth();

  /* Check if user can review, also assign layup and ratings */
  let canReview = false;
  let averageRating = 0;
  let calledItLayup = 0;
  if (reviews.length === 0) {
    canReview = true;
  } else {
    reviews.forEach(
      (review: { student: string; layup: boolean; course_rating: number }) => {
        if (review.student === session!.user!.id!) {
          canReview = false;
        }

        averageRating += review.course_rating;
        if (review.layup) {
          calledItLayup++;
        }
      }
    );

    averageRating = (averageRating / reviews.length) * 10;
  }

  const professors = [{ name: "No professors yet", reviewCount: 0 }];

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
        <Description
          description={
            description
              ? description
              : "No description provided from ORC website"
          }
        />

        {/* Rating stuff */}
        <Ratings averageRating={averageRating} calledItLayup={calledItLayup} />

        {/* Professor list */}
        <Professors professors={professors} />

        {/* Reviews list */}
        <Reviews reviews={reviews} />

        {/* Review form */}
        <ReviewForm
          review={reviewAction}
          courseName={courseName}
          email={session!.user!.email!}
          canReview={canReview}
        />
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing all info on this course
        </div>
      </CardFooter>
    </Card>
  );
}
