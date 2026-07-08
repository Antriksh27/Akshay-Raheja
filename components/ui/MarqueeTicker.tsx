'use client';

const marqueeItems = [
  "AE RI SAKHI",
  "CHOLI KE PEECHE",
  "SONA KITNA SONA HAI",
  "DAR BA DAR",
  "CHUNNARI CHUNNARI",
  "ISHQ-E-DESI",
  "GORI HAI KALAIYAN",
  "DUPAHIYA",
  "CHAANTA TERA",
  "MAA BEHEN"
];

export default function MarqueeTicker() {
  return (
    <div className="w-full h-16 md:h-20 bg-bg-base border-y border-hairline overflow-hidden flex items-center select-none relative z-20">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {/* We repeat the array twice to ensure seamless loop */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="font-structural text-sm md:text-base text-text-secondary tracking-widest uppercase mx-4 md:mx-6">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-flash"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
