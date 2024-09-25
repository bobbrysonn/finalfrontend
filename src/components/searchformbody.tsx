"use client"

import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

function Submit() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending ? "Searching..." : "Search"}
    </Button>
  )
}

export default function SearchFormBody() {
  const router = useRouter()

  const search = (formData: FormData) => {
    router.push(`/courses/${formData.get("search")}/`)
  }

  return (
    <form className="flex flex-col gap-3 items-center justify-center" action={search}>
      <Input
        type="text"
        placeholder="Search for Courses..."
        name="search"
        id="search-body"
      />
      <Submit />
    </form>
  )
}