import type { JSX } from "react";

import image1 from "@/assets/images/image-1.jpeg";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { useParallaxTilt } from "@/hooks/useParallaxTilt";

import type { HeroArtworkProps } from "./HeroArtwork.types";

export default function HeroArtwork({
  imageSrc = image1,
  altText = "The Fastoria 2027",
  className = "",
}: HeroArtworkProps = {}): JSX.Element {
  const { cardRef, tilt, handleMouseMove, handleMouseLeave } =
    useParallaxTilt();

  return (
    <div
      className={`lg:col-span-5 relative flex flex-col items-center justify-center mt-4 lg:mt-0 ${className}`.trim()}
    >
      <div className="w-full relative" style={{ perspective: "1200px" }}>
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
            className="w-full overflow-hidden aspect-4/3 bg-surface-container"
            style={{
              transform: "translateZ(18px)",
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={imageSrc}
              alt={altText}
              className="w-full h-full object-cover block transition-transform duration-300 pointer-events-none"
              style={{
                transform: tilt.isHovered ? "scale(1.06)" : "scale(1)",
              }}
            />
          </div>

          <div
            className="p-3.5 bg-surface-white border-t-[2.5px] border-black flex items-center justify-end gap-2"
            style={{
              transform: "translateZ(12px)",
            }}
          >
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
