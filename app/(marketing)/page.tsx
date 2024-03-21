import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MarketingPage() {
  return (
    <main className="flex-1 flex">
      <h1 className="sr-only">Lingo - language learning service</h1>
      <section className="flex flex-col lg:flex-row justify-center items-center gap-2 max-w-[988px] mx-auto p-4">
        <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
          <Image src="/images/marketing/hero.svg" fill alt="Promo image" />
        </div>
        <div className="grid place-content-center gap-y-3">
          <h2 className="max-w-[480px] mb-5 text-center text-xl lg:text-3xl font-bold text-neutral-600">
            Learn, practice, and master new languages with Lingo.
          </h2>
          <Button
            className="justify-self-center w-full max-w-[330px]"
            variant="secondary"
            size="lg"
          >
            Get started
          </Button>
          <Button
            className="justify-self-center w-full max-w-[330px]"
            variant="primaryOutline"
            size="lg"
          >
            I already have an account
          </Button>
        </div>
      </section>
    </main>
  );
}
