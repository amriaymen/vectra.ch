'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Product card media: a muted screen-capture loop where one exists, the still
 * everywhere else.
 *
 * The poster is always rendered as a real <Image>, underneath, so the card is
 * complete before the loop decodes and stays complete if it never does. Reduced
 * motion drops the video entirely — CSS cannot pause a video, so this needs the
 * matchMedia check rather than the global CSS block.
 */
export default function ProductMedia({
  poster,
  video,
  alt,
  priority,
  sizes,
}: {
  poster: string;
  video: string | null;
  alt: string;
  priority: boolean;
  sizes: string;
}) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setPlayVideo(true);
  }, [video]);

  return (
    <>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {playVideo && video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </>
  );
}
