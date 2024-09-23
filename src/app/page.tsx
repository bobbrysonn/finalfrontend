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
          <div className="flex justify-center mb-2">
            <Image
              src="/images/brand.png"
              alt="Based Reviews"
              width={100}
              height={100}
            />
          </div>
          <h1 className="text-3xl">Based Reviews</h1>
          <p>Dartmouth Course Reviews and Recommendations</p>
          <p className="text-muted-foreground">1 review and counting</p>

          <div className="mt-4">
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
