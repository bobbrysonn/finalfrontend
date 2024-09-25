"use client"

import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";

function Submit() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending ? "Searching..." : "Search"}
    </Button>
  )
}

export default function SearchFormNavbar() {
  const router = useRouter()

  const search = (formData: FormData) => {
    router.push(`/courses/${formData.get("search")}/`)
  }

  return (
    <form className="ml-auto flex-1 sm:flex-initial" action={search}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
        <Input
          type="search"
          name="search"
          placeholder="Search for courses..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>
    </form>
  )
}