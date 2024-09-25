import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";

export default function Reviews({reviews}: {
  reviews: { content: string, professor_name: string; term: string, review: string } []
}) {
  return (
    <div>
      <h5 className="font-semibold mt-10 mb-2 text-xl">
        Reviews ({reviews.length})
      </h5>
      {reviews.length > 0 ? (
        <Table>
          <TableBody>
            {reviews.map((review, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p>
                    <span className="font-semibold">
                      {review.term} with {review.professor_name}:
                    </span>{" "}
                    <span className="text-[#333333] dark:text-muted-foreground">
                      {review.content}
                    </span>
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  )
}