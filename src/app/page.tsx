import Image from "next/image";
import SearchFormBody from "@/components/forms/searchformbody";

export default function HomePage() {
  return (
    <main className="min-h-[60vh] md:min-h-[65vh] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-4">
        <div className="w-40 md:w-52 mx-auto mb-4 flex items-center justify-center">
          <Image
            priority
            src="/images/brand-body.png"
            alt="Based Reviews"
            width={128}
            height={128}
          />
        </div>
        <h1 className="text-2xl lg:text-4xl font-medium mb-2">Based Reviews</h1>
        <h2 className="text-sm lg:text-xl">
          Dartmouth Course Reviews, Rankings, and Recommendations
        </h2>
      </div>

      <div className="w-full max-w-md mb-6">
        <SearchFormBody />
      </div>
      {/* <div className="flex space-x-4 mb-8">
        <Button variant="outline">See Best Classes</Button>
        <Button variant="outline">See Layups</Button>
        <Button variant="outline">Browse</Button>
      </div> */}
    </main>
  );
}
