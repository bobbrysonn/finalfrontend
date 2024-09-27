"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReviewFormSchema } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ReviewDataSchema } from "@/lib/definitions";
import { useRouter } from "next/navigation";

export default function ReviewForm(x: {
  review: (
    data: ReviewDataSchema
  ) => Promise<{ error?: boolean; message?: string }>;
  courseName: string;
  email: string;
  canReview: boolean;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    defaultValues: {
      courseRating: 0,
      layup: false,
      medianGrade: undefined,
      professorEmail: "",
      professorRating: 0,
      review: "",
      term: "",
    },
    resolver: zodResolver(ReviewFormSchema),
  });

  async function handleSubmit(data: z.infer<typeof ReviewFormSchema>) {
    toast({ title: "Review", description: `Posting your review...` });

    const server_data = {
      content: data.review,
      course: x.courseName,
      course_rating: data.courseRating,
      term: data.term,
      professor: data.professorEmail,
      professor_rating: data.professorRating,
      median: data.medianGrade,
      student: x.email,
      layup: data.layup,
    };

    const res = await x.review(server_data);

    console.log(res);

    if (res?.error) {
      form.setError("review", { message: res.message });
      return;
    }

    router.refresh();
  }

  if (!x.canReview) {
    return (
      <div>
        <h5 className="font-semibold mt-10 mb-2 text-xl">Leave a review</h5>
        <Card className="rounded-lg md:border">
          <CardHeader>
            <CardDescription
              className={"text-[#333333] dark:text-muted-foreground"}
            >
              Thank you for taking the time to review this course. Your feedback
              is appreciated.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h5 className="font-semibold mt-10 mb-2 text-xl">Leave a review</h5>
      <Card className="rounded-lg md:border">
        <CardHeader>
          <CardDescription>
            Thank you for taking the time to review this course. Your feedback
            is appreciated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
              {/* Professor email */}
              <FormField
                control={form.control}
                name="professorEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="professorEmailGiven">
                      Professor Email
                    </FormLabel>
                    <Input
                      {...field}
                      type="email"
                      id="professorEmailGiven"
                      placeholder="peter.lanfer@dartmouth.edu"
                    />
                    <FormDescription>Enter professor email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Term */}
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="termGiven">Term</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      id="termGiven"
                      placeholder="24W"
                    />
                    <FormDescription>Enter school term</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Median */}
              <FormField
                control={form.control}
                name="medianGrade"
                render={({ field }) => (
                  <FormItem key={field.value}>
                    <FormLabel htmlFor="professorEmailGiven">
                      Median Grade
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup {...field}>
                          <SelectLabel>Letter Grade</SelectLabel>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="C+">C+</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="C-">C-</SelectItem>
                          <SelectItem value="D+">D+</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                          <SelectItem value="D-">D-</SelectItem>
                          <SelectItem value="E">E</SelectItem>
                          <SelectItem value="F">F</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select class Median Grade</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Ratings */}
              <div className="flex gap-2 [&>div]:flex-1">
                <FormField
                  control={form.control}
                  name="professorRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="professorRatingGiven">
                        Professor Rating
                      </FormLabel>
                      <Input
                        {...field}
                        type="number"
                        id="professorRatingGiven"
                        placeholder="7"
                      />
                      <FormDescription>
                        Rate your professor out of 10
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courseRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="courseRatingGiven">
                        Course Rating
                      </FormLabel>
                      <Input
                        {...field}
                        type="number"
                        id="courseRatingGiven"
                        placeholder="7"
                      />
                      <FormDescription>
                        Rate the class out of 10
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Review */}
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="reviewGiven">Review</FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Pour your heart out here..."
                      id="reviewGiven"
                      className="min-h-52"
                    />
                    <FormDescription>
                      Enter your opinion about the class
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Layup */}
              <FormField
                control={form.control}
                name="layup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="layupGiven">
                      Was this class a layup?
                    </FormLabel>
                    <div className="flex gap-3 items-center">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                    <FormDescription>Check to select yes</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem className="mt-4 mx-auto max-w-60">
                <Button type="submit" className="w-full">
                  Submit Review
                </Button>
              </FormItem>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
