import Image from "next/image";
import Link from "next/link";
import { CircleUser, AlignLeft, Search } from "lucide-react";
import { auth, signOut } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { redirect } from "next/navigation";
import NavLinks from "@/components/navlinks";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex h-16 items-center justify-center gap-4 px-4 md:px-6 rounded-sm">
      <div className="flex border-b items-center gap-4 max-w-screen-xl py-2 md:py-3 w-full">
        <NavLinks />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <AlignLeft className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Image
                  src="/images/brand.png"
                  alt="Based Reviews"
                  width={24}
                  height={24}
                />
                <span className="sr-only">Based Reviews</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/departments"
                className="text-muted-foreground hover:text-foreground"
              >
                Departments
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {user ? (
            <>
              <form className="ml-auto flex-1 sm:flex-initial">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    name="search"
                    placeholder="Search courses..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <DropdownMenuItem>
                    <form
                      action={async () => {
                        "use server";
                        await signOut({ redirect: false });

                        redirect("/auth/login");
                      }}
                      className="cursor-pointer"
                    >
                      <button type="submit">Sign out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ModeToggle />
            </>
          ) : (
            <Link href="/auth/login" className="ml-auto">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
