"use client";

interface AdUnitProps {
  slot: "sidebar" | "banner" | "in-content" | "footer";
  className?: string;
}

export default function AdUnit({ slot, className = "" }: AdUnitProps) {
  // Ad sizes for different slots
  const adConfig = {
    sidebar: { width: 300, height: 250, label: "300x250" },
    banner: { width: 728, height: 90, label: "728x90" },
    "in-content": { width: 336, height: 280, label: "336x280" },
    footer: { width: 970, height: 90, label: "970x90" },
  };

  const config = adConfig[slot];

  // In production, this would be replaced with actual ad code
  // For now, show a placeholder
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    // Production: Show actual Google AdSense or other ad network
    return (
      <div className={`ad-unit ad-${slot} ${className}`}>
        {/*
          Replace this with actual ad code, e.g.:
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        */}
        <div
          className="bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
          style={{
            width: config.width,
            height: config.height,
            maxWidth: "100%",
          }}
        >
          Advertisement
        </div>
      </div>
    );
  }

  // Development: Show placeholder
  return (
    <div className={`ad-unit ad-${slot} ${className}`}>
      <div
        className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm rounded"
        style={{
          width: config.width,
          height: config.height,
          maxWidth: "100%",
        }}
      >
        <div className="text-center">
          <div className="font-medium">Ad Space</div>
          <div className="text-xs">{config.label}</div>
        </div>
      </div>
    </div>
  );
}

// Responsive ad component that adapts to screen size
export function ResponsiveAdUnit({ className = "" }: { className?: string }) {
  return (
    <div className={`responsive-ad ${className}`}>
      {/* Mobile: 320x100 */}
      <div className="block sm:hidden">
        <div
          className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs rounded mx-auto"
          style={{ width: 320, height: 100, maxWidth: "100%" }}
        >
          <div className="text-center">
            <div className="font-medium">Ad</div>
            <div>320x100</div>
          </div>
        </div>
      </div>
      {/* Tablet: 468x60 */}
      <div className="hidden sm:block lg:hidden">
        <div
          className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs rounded mx-auto"
          style={{ width: 468, height: 60, maxWidth: "100%" }}
        >
          <div className="text-center">
            <div className="font-medium">Ad</div>
            <div>468x60</div>
          </div>
        </div>
      </div>
      {/* Desktop: 728x90 */}
      <div className="hidden lg:block">
        <div
          className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs rounded mx-auto"
          style={{ width: 728, height: 90, maxWidth: "100%" }}
        >
          <div className="text-center">
            <div className="font-medium">Ad</div>
            <div>728x90</div>
          </div>
        </div>
      </div>
    </div>
  );
}
