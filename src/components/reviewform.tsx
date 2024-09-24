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
  CardTitle,
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

export default function ReviewForm() {
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
    console.log(data);
  }

  return (
    <Card className="max-w-2xl rounded-lg md:border">
      <CardHeader>
        <CardTitle className="text-3xl">Review</CardTitle>
        <CardDescription>
          Thank you for taking the time to review your course. Your feedback is
          appreciated.
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
                    <FormDescription>Rate the class out of 10</FormDescription>
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
  );
}
