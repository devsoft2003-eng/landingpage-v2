"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { ProductRecord } from "@/types";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/input";
import { CaptchaField } from "@/components/download/captcha-field";
import { ProductInterfaceArt } from "@/components/products/product-interface-art";

export function DownloadExperience({ product }: { product: ProductRecord }) {
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState<{ token: string } | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setErrors({});
    const form = new FormData(event.currentTarget);
    const consent = form.get("consent") === "on";
    const payload = {
      productSlug: product.slug,
      fullName: form.get("fullName"),
      organization: form.get("organization"),
      designation: form.get("designation"),
      email: form.get("email"),
      mobile: form.get("mobile"),
      city: form.get("city"),
      state: form.get("state"),
      country: form.get("country") || "India",
      purpose: form.get("purpose"),
      consent,
      captchaToken: form.get("captchaToken") || form.get("cf-turnstile-response"),
    };
    const response = await fetch("/api/download/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as {
      error?: string;
      token?: string;
      fieldErrors?: Record<string, string>;
    };
    setPending(false);
    if (!response.ok || !data.token) {
      setErrors(data.fieldErrors ?? {});
      toast.error(data.error ?? "Registration could not be completed.");
      return;
    }
    setReady({ token: data.token });
    toast.success("Your download is ready.");
  }

  async function startDownload() {
    if (!ready) return;
    setDownloading(true);
    const response = await fetch(`/api/download/${product.slug}?token=${encodeURIComponent(ready.token)}`);
    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      toast.error(data.error ?? "Download is unavailable.");
      setDownloading(false);
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const disposition = response.headers.get("content-disposition");
    const match = disposition?.match(/filename="([^"]+)"/);
    anchor.href = url;
    anchor.download = match?.[1] ?? `${product.slug}.apk`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setDownloading(false);
    toast.success("Download started.");
  }

  return (
    <div className="section-pad">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-5">
          <ProductInterfaceArt slug={product.slug} />
          <div className="rounded-3xl border border-white/10 p-6">
            <p className="eyebrow">Product package</p>
            <h1 className="mt-3 text-3xl font-semibold text-ice">Download {product.name}</h1>
            <p className="mt-3 text-sm text-mist">{product.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-mist">Version</dt>
                <dd className="text-ice">{product.version ?? "To be confirmed"}</dd>
              </div>
              <div>
                <dt className="text-mist">Platform</dt>
                <dd className="text-ice">{product.platforms.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-mist">File</dt>
                <dd className="text-ice">{product.fileLabel ?? "Application package"}</dd>
              </div>
              <div>
                <dt className="text-mist">Size</dt>
                <dd className="text-ice">{product.fileSizeLabel ?? "Shown when issued"}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div className="glass rounded-3xl p-6 md:p-8">
          {ready ? (
            <div>
              <p className="eyebrow">Authorised</p>
              <h2 className="mt-3 text-3xl font-semibold text-ice">Your download is ready.</h2>
              <p className="mt-3 text-sm text-mist">
                The package will be streamed from DevSoft’s private storage. The file location is not published as a
                public URL.
              </p>
              <Button type="button" className="mt-8" size="lg" onClick={startDownload} disabled={downloading}>
                {downloading ? "Preparing file…" : `Download ${product.name}`}
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <p className="eyebrow">Before you download</p>
              <h2 className="text-3xl font-semibold text-ice">Download {product.name}</h2>
              <p className="text-sm text-mist">
                Please provide the following information before downloading the application.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" name="fullName" required autoComplete="name" />
                  <FieldError>{errors.fullName}</FieldError>
                </div>
                <div>
                  <Label htmlFor="organization">Organisation / Department</Label>
                  <Input id="organization" name="organization" required />
                  <FieldError>{errors.organization}</FieldError>
                </div>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" name="designation" required />
                </div>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" name="email" type="email" required autoComplete="email" />
                  <FieldError>{errors.email}</FieldError>
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile number</Label>
                  <Input id="mobile" name="mobile" required autoComplete="tel" />
                  <FieldError>{errors.mobile}</FieldError>
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" defaultValue="India" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="purpose">Purpose of download</Label>
                  <Textarea id="purpose" name="purpose" required />
                  <FieldError>{errors.purpose}</FieldError>
                </div>
              </div>
              <CaptchaField />
              <label className="flex items-start gap-3 text-sm text-mist">
                <input type="checkbox" name="consent" required className="mt-1" />
                <span>
                  I agree to the{" "}
                  <Link href="/privacy" className="text-cyan underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/download-terms" className="text-cyan underline">
                    Download Terms
                  </Link>
                  . Information provided through this form is used to maintain download records, understand product
                  adoption, provide product updates or support where applicable, and protect the distribution of DevSoft
                  software.
                </span>
              </label>
              <Button type="submit" disabled={pending}>
                {pending ? "Validating…" : "Continue"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
