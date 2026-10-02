"use client";

import { useEffect, useRef } from "react";

type Props = {
  mp4: string;
  webm: string;
  poster: string;
  width: number;
  height: number;
  label: string;
};

/**
 * Muted looping preview. Nothing is downloaded except the poster until the video scrolls near the viewport;
 * it then loads and plays. With reduced motion (or if autoplay is blocked) the poster stays visible.
 */
export default function LazyVideo({ mp4, webm, poster, width, height, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => {
      if (!video.querySelector("source")) {
        for (const [src, type] of [[webm, "video/webm"], [mp4, "video/mp4"]] as const) {
          const source = document.createElement("source");
          source.src = src;
          source.type = type;
          video.appendChild(source);
        }
        video.load();
      }
      video.play().catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else video.pause();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [mp4, webm]);

  return (
    <video
      ref={ref}
      className="demo-video"
      width={width}
      height={height}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      tabIndex={-1}
    />
  );
}
