import type { JSX } from "react";

import image1 from "@/assets/images/image-1.jpeg";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { useParallaxTilt } from "@/hooks/useParallaxTilt";

import type { HeroArtworkProps } from "./HeroArtwork.types";

export default function HeroArtwork({
  badgeLabel = "FASTORIA 2025 // OFFICIAL ARTWORK",
  imageSrc = image1,
  className = "",
}: HeroArtworkProps = {}): JSX.Element {
  const { cardRef, tilt, handleMouseMove, handleMouseLeave } =
    useParallaxTilt();

  return (
    <div
      className={`lg:col-span-5 relative flex flex-col items-center justify-center mt-4 lg:mt-0 ${className}`.trim()}
    >
      <div className="w-full relative" style={{ perspective: "1200px" }}>
        {/* Top Floating Badge Atom */}
        <Badge
          color="punch-coral"
          shadow="sm"
          className="absolute -top-3.5 left-4 z-30 pointer-events-none select-none -rotate-2"
          style={{
            transform: `translate3d(${tilt.rotateY * 0.5}px, ${-tilt.rotateX * 0.5}px, 40px) rotate(-2deg)`,
            transition: tilt.isHovered
              ? "transform 0.08s ease-out"
              : "transform 0.5s ease-out",
          }}
        >
          {badgeLabel}
        </Badge>

        {/* 3D Parallax Main Tilt Card Atom */}
        <Card
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          bgColor="canvas"
          borderWidth="thick"
          shadow="none"
          className="w-full relative overflow-hidden select-none cursor-grab active:cursor-grabbing group"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
              tilt.isHovered
                ? "scale3d(1.025, 1.025, 1.025)"
                : "scale3d(1, 1, 1)"
            }`,
            boxShadow: `${tilt.shadowX}px ${tilt.shadowY}px 0px #000000`,
            transformStyle: "preserve-3d",
            transition: tilt.isHovered
              ? "transform 0.08s ease-out, box-shadow 0.08s ease-out"
              : "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.55s ease",
          }}
        >
          {tilt.isHovered && (
            <div
              className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle 320px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 70%)`,
                mixBlendMode: "overlay",
              }}
            />
          )}

          <div
            className="w-full overflow-hidden relative aspect-4/3 bg-surface-container"
            style={{
              transform: "translateZ(18px)",
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={imageSrc}
              alt="Fastoria 2025"
              className="w-full h-full object-cover block transition-transform duration-300 pointer-events-none"
              style={{
                transform: tilt.isHovered ? "scale(1.06)" : "scale(1)",
              }}
            />

            {/* Corner Badge Atom */}
            <Badge
              color="secondary"
              shadow="xs"
              className="absolute bottom-3 right-3 z-10 rotate-3 font-black"
              style={{
                transform: "translateZ(30px) rotate(3deg)",
                transition: "transform 0.15s ease",
              }}
            >
              SEASON 02
            </Badge>
          </div>

          <div
            className="p-3.5 bg-surface-white border-t-[2.5px] border-black flex items-center justify-between gap-2"
            style={{
              transform: "translateZ(12px)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-primary-container border border-black inline-block animate-pulse" />
              <span className="font-label-caps text-[11px] sm:text-xs uppercase font-extrabold tracking-wider text-on-surface">
                TECH & CREATIVE ARENA
              </span>
            </div>
            {/* Action Mini Badge Atom */}
            <Badge
              color="electric-yellow"
              shadow="xs"
              className="rotate-1 font-black"
            >
              READY TO COMPETE?
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
