import { type MouseEvent, type RefObject,useRef, useState } from "react";

export interface TiltState {
  rotateX: number;
  rotateY: number;
  shadowX: number;
  shadowY: number;
  glareX: number;
  glareY: number;
  isHovered: boolean;
}

export function useParallaxTilt(maxTilt: number = 14): {
  cardRef: RefObject<HTMLDivElement | null>;
  tilt: TiltState;
  handleMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
} {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    shadowX: 6,
    shadowY: 6,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    const sX = 6 - rotY * 0.45;
    const sY = 6 + rotX * 0.45;

    const gX = (x / rect.width) * 100;
    const gY = (y / rect.height) * 100;

    setTilt({
      rotateX: Math.round(rotX * 10) / 10,
      rotateY: Math.round(rotY * 10) / 10,
      shadowX: Math.round(sX * 10) / 10,
      shadowY: Math.round(sY * 10) / 10,
      glareX: Math.round(gX),
      glareY: Math.round(gY),
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      shadowX: 6,
      shadowY: 6,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  };

  return { cardRef, tilt, handleMouseMove, handleMouseLeave };
}
