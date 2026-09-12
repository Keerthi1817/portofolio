import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const nodes: Node[] = [];
    const nodeCount = 120; // Increased from 60 for more density
    const connectionDistance = 150; // Slightly reduced for more realistic clustering

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement for more organic feel
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5, // Smaller, more varied sizes
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections with depth effect
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.2; // Slightly more visible
            const lineWidth = (1 - dist / connectionDistance) * 1.2; // Thicker when closer
            ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with depth and pulsing effect
      const time = Date.now() * 0.001;
      for (const node of nodes) {
        // Subtle pulsing effect
        const pulse = Math.sin(time + node.x * 0.01) * 0.3 + 1;
        const currentRadius = node.radius * pulse;
        
        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, 0.8)`;
        ctx.fill();

        // Inner glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 2, 0, Math.PI * 2);
        const innerGradient = ctx.createRadialGradient(
          node.x, node.y, 0, node.x, node.y, currentRadius * 2
        );
        innerGradient.addColorStop(0, "rgba(45, 212, 191, 0.3)");
        innerGradient.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.fillStyle = innerGradient;
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 4, 0, Math.PI * 2);
        const outerGradient = ctx.createRadialGradient(
          node.x, node.y, 0, node.x, node.y, currentRadius * 4
        );
        outerGradient.addColorStop(0, "rgba(45, 212, 191, 0.1)");
        outerGradient.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.fillStyle = outerGradient;
        ctx.fill();

        // Move with slight acceleration
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges with slight randomness
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
          node.vx += (Math.random() - 0.5) * 0.1;
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1;
          node.vy += (Math.random() - 0.5) * 0.1;
        }
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
