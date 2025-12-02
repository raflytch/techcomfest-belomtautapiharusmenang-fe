"use client";

import { LoaderThree } from "@/components/ui/loader";

export default function FullscreenLoader({ text }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-50/95 backdrop-blur-sm">
      <LoaderThree />
      {text && (
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
