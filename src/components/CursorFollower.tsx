import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  hue: number;
}

let particleId = 0;

export function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const spawnParticle = useCallback((px: number, py: number) => {
    const id = ++particleId;
    const hue = 175 + Math.random() * 85; // teal to purple range
    setParticles((prev) => [
      ...prev.slice(-20), // keep max 20 particles
      { id, x: px, y: py, opacity: 1, scale: Math.random() * 0.5 + 0.5, hue },
    ]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 600);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 12) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        spawnParticle(e.clientX, e.clientY);
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleHoverCheck);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHoverCheck);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible, x, y, spawnParticle]);

  // Animate particle fade
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          opacity: Math.max(0, p.opacity - 0.03),
          scale: p.scale * 0.97,
        }))
      );
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Particle trail */}
      <div className="pointer-events-none fixed inset-0 z-[9998]">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: 8 * p.scale,
              height: 8 * p.scale,
              transform: "translate(-50%, -50%)",
              background: `hsl(${p.hue} 80% 60%)`,
              opacity: p.opacity,
              boxShadow: `0 0 ${12 * p.scale}px hsl(${p.hue} 80% 50% / 0.6)`,
              transition: "opacity 0.1s",
            }}
          />
        ))}
      </div>

      {/* Main cursor follower */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x, y }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: isHovering ? 48 : 180,
            height: isHovering ? 48 : 180,
            borderWidth: isHovering ? 2 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            background: isHovering
              ? "transparent"
              : "radial-gradient(circle, hsl(175 80% 50% / 0.1) 0%, hsl(260 60% 60% / 0.04) 50%, transparent 70%)",
            borderColor: isHovering ? "hsl(175 80% 50% / 0.5)" : "transparent",
            borderStyle: "solid",
          }}
        />
        {/* Inner dot */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70"
          animate={{
            width: isHovering ? 6 : 12,
            height: isHovering ? 6 : 12,
          }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: "0 0 14px 5px hsl(175 80% 50% / 0.4), 0 0 30px 8px hsl(260 60% 60% / 0.15)",
          }}
        />
      </motion.div>
    </>
  );
}
