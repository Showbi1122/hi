import Script from "next/script";

type GoogleAnalyticsProps = {
  gaId: string;
};

/**
 * GA4 via next/script afterInteractive so gtag does not compete with LCP.
 * Tag still loads on every page; dataLayer is defined as soon as the init
 * script runs after hydration.
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag-init" strategy="afterInteractive">
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
