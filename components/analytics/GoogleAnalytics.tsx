import Script from "next/script";

type GoogleAnalyticsProps = {
  gaId: string;
};

/**
 * GA4 via next/script (beforeInteractive) so the tag is present in the
 * initial HTML — View Source / Tag Assistant can see googletagmanager + the ID.
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="beforeInteractive"
      />
      <Script id="ga-gtag-init" strategy="beforeInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
`.trim()}
      </Script>
    </>
  );
}
