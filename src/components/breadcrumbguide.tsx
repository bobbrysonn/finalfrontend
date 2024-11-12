"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {HomeIcon, ChevronRightIcon} from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DynamicBreadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter((segment) => segment !== "");

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="flex items-center">
                        <HomeIcon className="mr-2 h-4 w-4"/>
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathSegments.length - 1;

                    /* The segment can sometimes be an encoded URI so make sure to decode */
                    let decodedSegment: string;
                    try {
                        decodedSegment = decodeURIComponent(segment)
                    } catch (error) {
                        console.error(error);
                        decodedSegment = segment;
                    }

                    /* Check for dashes (-) in the segment. If so, change it from best-classes to Best Classes */
                    decodedSegment = decodedSegment.split("-").map((seg) => seg.charAt(0).toLocaleUpperCase() + seg.slice(1, seg.length)).join(" ")

                    return (
                        <BreadcrumbItem key={href}>
                            <BreadcrumbSeparator>
                                <ChevronRightIcon className="h-4 w-4"/>
                            </BreadcrumbSeparator>
                            {isLast ? (
                                <span className="font-medium text-foreground capitalize">
                                    {decodedSegment}
                                </span>
                            ) : (
                                <Link href={href} className="capitalize">
                                    {decodedSegment}
                                </Link>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
