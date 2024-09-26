import {auth} from "@/lib/auth"
import {NextResponse} from "next/server";

export default auth((req) => {
  if (!req.auth) {
    /* If path is root, auth/login, auth/register, proceed as usual */
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/auth/register") {
      return NextResponse.next()
    } else {
      /* Else redirect to log in */
      const newUrl = new URL("/auth/login", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}