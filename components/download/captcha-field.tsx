"use client";

import { useEffect, useState } from "react";
import { Input, Label } from "@/components/ui/input";

export function CaptchaField() {
  const [mode, setMode] = useState<"turnstile" | "local" | "loading">("loading");
  const [question, setQuestion] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;

  useEffect(() => {
    async function load() {
      if (siteKey) {
        setMode("turnstile");
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        document.body.appendChild(script);
        return;
      }
      const response = await fetch("/api/captcha");
      const data = (await response.json()) as { question?: string };
      setQuestion(data.question ?? "Verification unavailable");
      setMode("local");
    }
    load();
  }, [siteKey]);

  if (mode === "turnstile") {
    return (
      <div className="mt-4">
        <div className="cf-turnstile" data-sitekey={siteKey} data-theme="dark" />
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Label htmlFor="captchaToken">{question || "Verification"}</Label>
      <Input id="captchaToken" name="captchaToken" required inputMode="numeric" autoComplete="off" />
      <p className="mt-1 text-xs text-mist">Local verification is used when Cloudflare Turnstile is not configured.</p>
    </div>
  );
}
