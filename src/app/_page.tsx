import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-[45vh] px-4">
        <section className="text-center">
          <div className="flex justify-center my-4">
            <Image
              src="/images/brand-light.png"
              alt="Based Reviews"
              width={256}
              height={256}
            />
          </div>
          <h1 className="text-3xl">Based Reviews</h1>
          <p>Dartmouth Course Reviews and Recommendations</p>
          <p className="text-muted-foreground text-sm">1 review and counting</p>

          <div>
            <p className="text-lg mt-4">Find the best courses at Dartmouth</p>
            <p className="text-lg">based on your interests and preferences</p>
          </div>

          <div className="flex gap-4 justify-center mt-4">
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
            <Link href="/departments">
              <Button>Browse</Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
