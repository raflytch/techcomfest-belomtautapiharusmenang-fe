"use client";

import { LoaderThree } from "@/components/ui/loader";

export default function FullscreenLoader({ text }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
      <LoaderThree />
      {text && (
        <p className="mt-4 text-sm text-white/90 animate-pulse">{text}</p>
      )}
    </div>
  );
}
