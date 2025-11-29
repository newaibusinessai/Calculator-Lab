"use client";

import Script from "next/script";

interface AnalyticsProps {
  gaId?: string;
}

export default function Analytics({ gaId }: AnalyticsProps) {
  // Don't render if no GA ID is provided
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Google AdSense component
interface AdSenseProps {
  adClient?: string;
}

export function AdSenseScript({ adClient }: AdSenseProps) {
  if (!adClient) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

// Track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Track calculator usage
export function trackCalculation(calculatorName: string) {
  trackEvent("calculate", "Calculator", calculatorName);
}

// Track share actions
export function trackShare(platform: string, calculatorName: string) {
  trackEvent("share", platform, calculatorName);
}

// Track print actions
export function trackPrint(calculatorName: string) {
  trackEvent("print", "Calculator", calculatorName);
}
