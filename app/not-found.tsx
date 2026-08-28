import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shell grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-ice">This page is not available.</h1>
        <p className="mt-3 text-sm text-mist">The address may be incorrect, or the resource is restricted.</p>
        <Button asChild className="mt-8">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
