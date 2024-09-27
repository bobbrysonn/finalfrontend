import {Card, CardContent} from "@/components/ui/card";

export default function Ratings() {
  return (
    <div className="flex justify-between mx-auto max-w-3xl mt-6 md:mt-10">
      <Card className="max-w-56 w-full">
        <CardContent className="flex flex-col gap-2 items-center justify-center p-4">
          <p className="text-4xl font-bold text-green-400">78</p>
          <p className="text-sm mb-2">Average Rating</p>
        </CardContent>
      </Card>
      <Card className="max-w-56 w-full">
        <CardContent className="flex flex-col gap-2 items-center justify-center p-4">
          <p className="text-4xl font-bold text-green-400">11</p>
          <p className="text-sm mb-2">called it a layup</p>
        </CardContent>
      </Card>
    </div>
  )
}