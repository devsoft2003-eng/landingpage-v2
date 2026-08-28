import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Download Terms",
  description: "Terms for registering and downloading DevSoft software packages.",
  path: "/download-terms",
});

export default function DownloadTermsPage() {
  return (
    <div className="section-pad">
      <div className="container-shell max-w-3xl text-sm leading-relaxed text-mist">
        <p className="eyebrow">Download data notice</p>
        <h1 className="mt-3 text-4xl font-semibold text-ice">Download Terms</h1>
        <p className="mt-4">
          Information provided through the download form is used to maintain download records, understand product
          adoption, provide product updates or support where applicable, and protect the distribution of DevSoft
          software.
        </p>
        <h2 className="mt-8 text-lg font-semibold text-ice">Registration</h2>
        <p className="mt-2">
          You must provide accurate organisation details. Downloads are issued to the requestor for authorised use.
          Redistribution of packages is not permitted unless DevSoft agrees in writing.
        </p>
        <h2 className="mt-6 text-lg font-semibold text-ice">Tokens</h2>
        <p className="mt-2">
          After a successful registration you receive a short-lived download authorisation. It is not a public file
          path. Expired tokens require a new registration.
        </p>
        <h2 className="mt-6 text-lg font-semibold text-ice">Packages</h2>
        <p className="mt-2">
          Install software only if your organisation authorises it. Android packages that are not distributed through a
          store may require your device’s policy for installing applications from DevSoft.
        </p>
        <h2 className="mt-6 text-lg font-semibold text-ice">No warranty on this page</h2>
        <p className="mt-2">
          Software warranties, support SLAs, and licence fees are not defined here and must be confirmed in a separate
          agreement.
        </p>
      </div>
    </div>
  );
}
