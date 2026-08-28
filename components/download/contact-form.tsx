"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { products } from "@/config/products";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/input";
import { CaptchaField } from "@/components/download/captcha-field";

export function ContactForm() {
  const search = useSearchParams();
  const defaultProduct = search.get("product") ?? "";
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const productOptions = useMemo(() => products.map((p) => ({ slug: p.slug, name: p.name })), []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setPending(true);
    setErrors({});
    const form = new FormData(formElement);
    const payload = {
      ...Object.fromEntries(form.entries()),
      captchaToken: form.get("captchaToken") || form.get("cf-turnstile-response"),
    };
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { error?: string; fieldErrors?: Record<string, string> };
    setPending(false);
    if (!response.ok) {
      setErrors(data.fieldErrors ?? {});
      toast.error(data.error ?? "Unable to send the enquiry.");
      return;
    }
    toast.success("Enquiry received. DevSoft will respond by email.");
    formElement.reset();
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" required autoComplete="name" />
          <FieldError>{errors.fullName}</FieldError>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
          <FieldError>{errors.email}</FieldError>
        </div>
        <div>
          <Label htmlFor="organization">Organisation</Label>
          <Input id="organization" name="organization" autoComplete="organization" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" autoComplete="tel" />
        </div>
        <div>
          <Label htmlFor="enquiryType">Enquiry type</Label>
          <select
            id="enquiryType"
            name="enquiryType"
            className="h-11 w-full rounded-xl border border-white/10 bg-navy-950/70 px-3 text-sm"
            defaultValue="business"
          >
            <option value="business">Business enquiry</option>
            <option value="product">Product enquiry</option>
            <option value="support">Support enquiry</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <Label htmlFor="product">Product</Label>
          <select
            id="product"
            name="product"
            className="h-11 w-full rounded-xl border border-white/10 bg-navy-950/70 px-3 text-sm"
            defaultValue={defaultProduct}
          >
            <option value="">Not specific</option>
            {productOptions.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
        <FieldError>{errors.message}</FieldError>
      </div>
      <CaptchaField />
      <p className="mt-4 text-xs text-mist">
        Enquiries are stored for response by DevSoft. Direct email: {siteConfig.email}
      </p>
      <Button type="submit" className="mt-6" disabled={pending}>
        {pending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
