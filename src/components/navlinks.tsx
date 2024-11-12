"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

const links = [
    {href: "/", title: "Home"},
    {href: "/best-classes", title: "Best Classes"},
    {href: "/layups", title: "Layups"},
    {href: "/departments", title: "Departments"},
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav
            className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base shrink-0"
            >
                <Image
                    src="/images/brand.png"
                    alt="Based Reviews"
                    width={24}
                    height={24}
                />
                <span className="sr-only">Based Reviews</span>
            </Link>
            {links.map(({href, title}) => (
                <Link
                    key={href}
                    href={href}
                    className={`${pathname === href ? "" : "text-muted-foreground hover:text-foreground"} transition-colors shrink-0`}
                >
                    {title}
                </Link>
            ))}
        </nav>
    );
}
