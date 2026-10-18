import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <main className="container flex min-h-[60vh] items-center justify-center py-16">
      <section className="w-full max-w-xl text-center">
        <p className="text-7xl font-extrabold tracking-tight text-slate-200 md:text-9xl">
          404
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[.25em] text-slate-400">
          Page not found
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          The story you’re looking for has moved on.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
          That address does not match a guide in Hanoi Heritage. Return to the
          collection or go back to the previous page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/">
            <Compass size={15} aria-hidden="true" />
            Explore heritage sites
          </Button>
          <Button as="button" type="button" variant="secondary" onClick={() => window.history.back()}>
            <ArrowLeft size={15} aria-hidden="true" />
            Go back
          </Button>
        </div>
      </section>
    </main>
  );
}
