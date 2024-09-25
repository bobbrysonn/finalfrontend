import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

export default function Professors({professors}: { professors: { name: string, reviewCount: number }[] }) {
  return (
    <div>
      <h5 className="font-semibold mt-10 text-xl">Professors</h5>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Number of reviews</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {professors.map((professor) => (
            <TableRow key={professor.name}>
              <TableCell>
                <Link href="#" className="hover:underline">
                  {professor.name}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <Badge>{professor.reviewCount}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}