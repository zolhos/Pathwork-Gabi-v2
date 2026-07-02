"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Setup Video and Canvas scrubbing
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Create hidden video element
    const video = document.createElement("video");
    video.src = "/Lotus_seed_to_bloom_time-lapse_202607020015.mp4";
    video.preload = "auto";
    video.playsInline = true;
    video.muted = true;
    video.loop = false;
    videoRef.current = video;

    // Handle canvas sizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame();
    };

    const drawFrame = () => {
      if (video.readyState >= 2) {
        // Draw video fitting the canvas (object-cover logic)
        const videoRatio = video.videoWidth / video.videoHeight;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight, xOffset, yOffset;

        if (canvasRatio > videoRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / videoRatio;
          xOffset = 0;
          yOffset = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * videoRatio;
          drawHeight = canvas.height;
          xOffset = (canvas.width - drawWidth) / 2;
          yOffset = 0;
        }

        ctx.drawImage(video, xOffset, yOffset, drawWidth, drawHeight);
      }
    };

    video.addEventListener("loadedmetadata", () => {
      setVideoLoaded(true);
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    });

    // Make sure we draw whenever video is seeked
    video.addEventListener("seeked", drawFrame);

    // GSAP ScrollTrigger logic linked to scroll position
    let scrollTriggerInstance = null;

    if (video) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: "#scroll-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          // Sync video current time directly to scroll progress
          if (video.duration) {
            const targetTime = self.progress * video.duration;
            video.currentTime = Math.min(targetTime, video.duration - 0.05);
          }
          
          // Animate layers based on current frame (out of 240 frames total)
          const currentFrame = self.progress * 240;
          
          // --- FASE 1 (Frames 0-75) ---
          const heroLayer = document.querySelector("#hero-layer");
          const bgOverlay = document.querySelector("#indigo-glow");
          if (heroLayer) {
            if (currentFrame <= 75) {
              const opacity = 1 - currentFrame / 75;
              heroLayer.style.opacity = opacity;
              heroLayer.style.transform = `translate3d(-${(currentFrame / 75) * 50}px, -50%, 0)`;
              heroLayer.style.pointerEvents = opacity < 0.1 ? "none" : "auto";
            } else {
              heroLayer.style.opacity = 0;
              heroLayer.style.pointerEvents = "none";
            }
          }
          if (bgOverlay) {
            if (currentFrame <= 75) {
              bgOverlay.style.opacity = 1 - currentFrame / 75;
            } else {
              bgOverlay.style.opacity = 0;
            }
          }

          // --- FASE 2 (Frames 76-165) ---
          const cards = document.querySelectorAll(".fase-2-card");
          if (cards.length > 0) {
            // Target frames range: 76 to 165
            cards.forEach((card, index) => {
              const startFrame = 76 + index * 12; // stagger entry
              const peakFrame = startFrame + 20;
              const endFrame = peakFrame + 25;

              if (currentFrame >= startFrame && currentFrame <= endFrame) {
                let opacity = 0;
                if (currentFrame < peakFrame) {
                  // Fade in
                  opacity = (currentFrame - startFrame) / (peakFrame - startFrame);
                } else {
                  // Fade out
                  opacity = 1 - (currentFrame - peakFrame) / (endFrame - peakFrame);
                }
                card.style.opacity = opacity;
                card.style.transform = `translate3d(0, ${(1 - opacity) * 20}px, 0)`;
                card.style.pointerEvents = opacity < 0.1 ? "none" : "auto";
              } else {
                card.style.opacity = 0;
                card.style.pointerEvents = "none";
              }
            });
          }

          // --- FASE 3 (Frames 166-240) ---
          const finalLayer = document.querySelector("#final-layer");
          const finalBackground = document.querySelector("#light-background");
          if (finalLayer) {
            if (currentFrame >= 166) {
              const opacity = (currentFrame - 166) / (240 - 166);
              finalLayer.style.opacity = opacity;
              finalLayer.style.transform = `translate3d(-50%, -${50 + (1 - opacity) * 10}%, 0)`;
              finalLayer.style.pointerEvents = opacity < 0.1 ? "none" : "auto";
            } else {
              finalLayer.style.opacity = 0;
              finalLayer.style.pointerEvents = "none";
            }
          }
          if (finalBackground) {
            if (currentFrame >= 166) {
              finalBackground.style.opacity = (currentFrame - 166) / (200 - 166); // Quick fade-in of white backdrop
            } else {
              finalBackground.style.opacity = 0;
            }
          }
        }
      });
    }

    // Magnetic effect on WhatsApp CTA button in Fase 3
    const ctaBtn = document.querySelector(".magnetic-btn");
    const handleMouseMove = (e) => {
      const rect = ctaBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(ctaBtn, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(ctaBtn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    if (ctaBtn) {
      ctaBtn.addEventListener("mousemove", handleMouseMove);
      ctaBtn.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      lenis.destroy();
      window.removeEventListener("resize", resizeCanvas);
      if (video) {
        video.removeEventListener("seeked", drawFrame);
        video.src = "";
        video.load();
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (ctaBtn) {
        ctaBtn.removeEventListener("mousemove", handleMouseMove);
        ctaBtn.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <>
      {/* Fixed Fullscreen Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover -z-20 pointer-events-none"
      />
      
      {/* Fases Overlay effects */}
      <div 
        id="indigo-glow" 
        className="fixed inset-0 glow-purple -z-10 pointer-events-none transition-opacity duration-300"
      />
      
      {/* Light Noon Background for Fase 3 (bloom) */}
      <div 
        id="light-background" 
        className="fixed inset-0 bg-[#f7f7f9] opacity-0 -z-10 pointer-events-none transition-opacity duration-500"
      />

      {/* Loading Placeholder */}
      {!videoLoaded && (
        <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-brand-purple border-t-transparent animate-spin" />
            <p className="text-sm font-semibold tracking-wider text-gray-400">CARREGANDO JORNADA...</p>
          </div>
        </div>
      )}
    </>
  );
}
