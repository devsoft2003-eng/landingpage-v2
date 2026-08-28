"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-shell grid min-h-[50vh] place-items-center py-20 text-center">
      <div>
        <h1 className="text-3xl font-semibold text-ice">Something went wrong.</h1>
        <p className="mt-3 text-sm text-mist">Please try again. If the problem continues, contact DevSoft by email.</p>
        <Button className="mt-8" type="button" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
