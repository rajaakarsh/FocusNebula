"use client";

import React, { useEffect, useRef } from "react";

interface SpaceBackgroundProps {
  theme?: "deep-space" | "solar-gold" | "hyperdrive-cyan";
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({
  theme = "deep-space",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // 1. Starfield setup
    const starCount = Math.min(Math.floor((width * height) / 1800), 800);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.3,
      baseOpacity: Math.random() * 0.7 + 0.15,
      opacity: Math.random() * 0.7 + 0.15,
      twinkleSpeed: Math.random() * 0.03 + 0.005,
      speedX: (Math.random() - 0.5) * 0.05,
      speedY: (Math.random() - 0.5) * 0.05,
      color:
        Math.random() > 0.8
          ? "#3CCBFF"
          : Math.random() > 0.6
          ? "#F4A940"
          : "#FFFFFF",
    }));

    // 2. Shooting Star System
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      dx: number;
      dy: number;
    }

    let activeShootingStar: ShootingStar | null = null;
    let lastShootingStarTime = Date.now();

    const spawnShootingStar = () => {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.2; // ~45 deg
      const speed = Math.random() * 8 + 12;
      activeShootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.3,
        length: Math.random() * 120 + 80,
        speed,
        angle,
        opacity: 1,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
      };
      lastShootingStarTime = Date.now();
    };

    // Initial shooting star spawn
    setTimeout(spawnShootingStar, 3000);

    // 3. Space dust / particle system
    const dustCount = 45;
    const dustParticles = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      vy: -(Math.random() * 0.15 + 0.03),
      vx: (Math.random() - 0.5) * 0.08,
      opacity: Math.random() * 0.35 + 0.1,
      color: theme === "solar-gold" ? "#F4A940" : theme === "hyperdrive-cyan" ? "#3CCBFF" : "#C7B8FF",
    }));

    const render = () => {
      // Smooth mouse lerp for parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = (mouseX - width / 2) * 0.02;
      const parallaxY = (mouseY - height / 2) * 0.02;

      ctx.clearRect(0, 0, width, height);

      // Layer 1: Deep Universe Gradient
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (theme === "solar-gold") {
        baseGrad.addColorStop(0, "#050302");
        baseGrad.addColorStop(0.5, "#0D0803");
        baseGrad.addColorStop(1, "#030201");
      } else if (theme === "hyperdrive-cyan") {
        baseGrad.addColorStop(0, "#010508");
        baseGrad.addColorStop(0.5, "#030D14");
        baseGrad.addColorStop(1, "#010407");
      } else {
        // Deep Space
        baseGrad.addColorStop(0, "#020305");
        baseGrad.addColorStop(0.5, "#060913");
        baseGrad.addColorStop(1, "#020305");
      }
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Mouse Parallax Glow
      const spotlightGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        width * 0.4
      );
      if (theme === "solar-gold") {
        spotlightGrad.addColorStop(0, "rgba(244, 169, 64, 0.08)");
        spotlightGrad.addColorStop(1, "transparent");
      } else if (theme === "hyperdrive-cyan") {
        spotlightGrad.addColorStop(0, "rgba(60, 203, 255, 0.08)");
        spotlightGrad.addColorStop(1, "transparent");
      } else {
        spotlightGrad.addColorStop(0, "rgba(60, 203, 255, 0.05)");
        spotlightGrad.addColorStop(0.6, "rgba(199, 184, 255, 0.03)");
        spotlightGrad.addColorStop(1, "transparent");
      }
      ctx.fillStyle = spotlightGrad;
      ctx.fillRect(0, 0, width, height);

      // Layer 3: Soft Nebula Fog
      const neb1 = ctx.createRadialGradient(
        width * 0.25 + parallaxX * 2,
        height * 0.3 + parallaxY * 2,
        20,
        width * 0.25,
        height * 0.3,
        width * 0.45
      );
      neb1.addColorStop(0, theme === "solar-gold" ? "rgba(244, 169, 64, 0.04)" : "rgba(60, 203, 255, 0.04)");
      neb1.addColorStop(1, "transparent");
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      const neb2 = ctx.createRadialGradient(
        width * 0.75 - parallaxX * 2,
        height * 0.7 - parallaxY * 2,
        30,
        width * 0.75,
        height * 0.7,
        width * 0.5
      );
      neb2.addColorStop(0, theme === "solar-gold" ? "rgba(217, 119, 6, 0.03)" : "rgba(199, 184, 255, 0.04)");
      neb2.addColorStop(1, "transparent");
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // Layer 4: Twinkling Starfield with Parallax
      stars.forEach((star) => {
        if (!prefersReducedMotion) {
          star.opacity += star.twinkleSpeed;
          if (star.opacity > 1 || star.opacity < 0.1) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }
          star.x += star.speedX;
          star.y += star.speedY;

          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;
        }

        const renderX = star.x + parallaxX * (star.radius * 0.8);
        const renderY = star.y + parallaxY * (star.radius * 0.8);

        ctx.beginPath();
        ctx.arc(renderX, renderY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.opacity));
        ctx.fill();
      });

      // Layer 5: Shooting Star Animation
      const now = Date.now();
      if (!activeShootingStar && now - lastShootingStarTime > 22000) {
        spawnShootingStar();
      }

      if (activeShootingStar) {
        const ss = activeShootingStar;
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.opacity -= 0.015;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          activeShootingStar = null;
        } else {
          const tailX = ss.x - Math.cos(ss.angle) * ss.length;
          const tailY = ss.y - Math.sin(ss.angle) * ss.length;

          const ssGrad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
          ssGrad.addColorStop(0, "rgba(255, 255, 255, " + ss.opacity + ")");
          ssGrad.addColorStop(0.3, "rgba(60, 203, 255, " + ss.opacity * 0.8 + ")");
          ssGrad.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = ssGrad;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#3CCBFF";
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Layer 6: Floating Space Dust
      dustParticles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
        }
        const dx = p.x + parallaxX * 1.5;
        const dy = p.y + parallaxY * 1.5;

        ctx.beginPath();
        ctx.arc(dx, dy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Subtle sci-fi grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,3,5,0.7)_100%)] pointer-events-none" />
    </div>
  );
};
