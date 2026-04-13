"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  slot?: string;
  format?: string;
  className?: string;
}

export default function AdUnit({
  format = "auto",
  className = "",
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7143327137200263"
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function ResponsiveAdUnit({ className = "" }: { className?: string }) {
  return <AdUnit format="auto" className={className} />;
}
