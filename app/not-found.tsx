import { Aurora } from "@/components/ui/Aurora";
import { GradientButton } from "@/components/ui/GradientButton";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-noir px-5 text-center text-ivory">
      <Aurora className="-z-10" />
      <p className="label text-champagne">Error 404</p>
      <h1 className="mt-6 font-display text-6xl leading-none sm:text-8xl">
        Lost in the <em className="text-gradient">night.</em>
      </h1>
      <p className="mt-6 max-w-md text-ivory/75">The page you were looking for has slipped out of the salon.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <GradientButton href="/">Return to the maison</GradientButton>
        <GradientButton href="/collection" variant="ghost-light">
          The collection
        </GradientButton>
      </div>
    </section>
  );
}
