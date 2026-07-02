"use client";

import { useEffect, useRef, useState } from "react";
import gsapRaw from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function ScrollCanvas() {
  const canvasRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef([]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsapRaw.registerPlugin(ScrollTrigger);

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
    gsapRaw.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsapRaw.ticker.lagSmoothing(0);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const totalFrames = 240;
    let loadedCount = 0;

    // Helper to draw a specific frame image to the canvas
    const drawFrame = (frameIndex) => {
      const img = imagesRef.current[frameIndex];
      if (img && img.complete && canvas) {
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight, xOffset, yOffset;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          xOffset = 0;
          yOffset = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          xOffset = (canvas.width - drawWidth) / 2;
          yOffset = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);
      }
    };

    // Preload image sequence to RAM before starting
    const preloadImages = () => {
      const tempImages = [];
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, "0");
        img.src = `/Pathwork-Gabi-v2/assets/lotus-frames/frame_${frameNum}.webp`;
        
        img.onload = () => {
          loadedCount++;
          const progress = Math.round((loadedCount / totalFrames) * 100);
          setLoadProgress(progress);

          if (loadedCount === totalFrames) {
            setVideoLoaded(true);
            resizeCanvas();
            initAnimationTimeline();
          }
        };

        img.onerror = () => {
          // If a frame fails to load, count it anyway to prevent app lock
          loadedCount++;
          if (loadedCount === totalFrames) {
            setVideoLoaded(true);
            resizeCanvas();
            initAnimationTimeline();
          }
        };

        tempImages.push(img);
      }
      imagesRef.current = tempImages;
    };

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-draw current frame index based on scroll position
        const scrollTrigger = ScrollTrigger.getById("master-scroll");
        if (scrollTrigger) {
          const currentFrame = Math.min(Math.floor(scrollTrigger.progress * (totalFrames - 1)), totalFrames - 1);
          drawFrame(currentFrame);
        } else {
          drawFrame(0);
        }
      }
    };

    window.addEventListener("resize", resizeCanvas);
    preloadImages();

    let mainTimeline = null;

    const initAnimationTimeline = () => {
      // 1. Create a proxy object to smooth out the frame index transitions via GSAP scrub
      const frameProxy = { frame: 0 };

      // 2. Set initial CSS states using 3D hardware-accelerated transforms
      gsapRaw.set("#hero-layer", { transform: "translate3d(0, -50%, 0)", opacity: 1 });
      gsapRaw.set(".fase-2-card", { transform: "translate3d(0, 30px, 0)", opacity: 0, pointerEvents: "none" });
      gsapRaw.set("#final-layer", { opacity: 0, pointerEvents: "none" });
      gsapRaw.set("#final-layer-content", { transform: "translate3d(0, 40px, 0)" });
      gsapRaw.set("#light-background", { opacity: 0 });

      // 3. Create a master timeline with scrub damping
      mainTimeline = gsapRaw.timeline({
        id: "master-scroll",
        scrollTrigger: {
          trigger: "#scroll-wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Damping effect to prevent scroll snapping/stuttering
        }
      });

      // Animate frame drawing via proxy
      mainTimeline.to(frameProxy, {
        frame: totalFrames - 1,
        ease: "none",
        duration: 10, // Virtual relative timeline length
        onUpdate: () => {
          const frameIndex = Math.min(Math.floor(frameProxy.frame), totalFrames - 1);
          drawFrame(frameIndex);
        }
      }, 0);

      // --- FASE 1: Hero Fade out (Frames 0-75 -> approx 0% to 31% of scroll) ---
      mainTimeline.to("#hero-layer", {
        opacity: 0,
        x: -50,
        ease: "power1.inOut",
        duration: 3,
        onUpdate: function() {
          const hero = document.querySelector("#hero-layer");
          if (hero) hero.style.pointerEvents = this.progress() > 0.8 ? "none" : "auto";
        }
      }, 0);
      
      mainTimeline.to("#indigo-glow", {
        opacity: 0,
        ease: "none",
        duration: 3
      }, 0);

      // --- FASE 2: Staggered entry/exit of micro-cards (Frames 76-165 -> approx 31% to 68%) ---
      const cards = gsapRaw.utils.toArray(".fase-2-card");
      const cardStep = 5.2 / cards.length; // 0.65 spacing between entry triggers

      cards.forEach((card, index) => {
        const start = 2.0 + index * cardStep;

        // Card Entry (Uses translate3d on GPU)
        mainTimeline.to(card, {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          ease: "power2.out",
          duration: 0.45
        }, start);

        // Card Exit (starts at 0.6s offset, gone in 0.45s)
        mainTimeline.to(card, {
          opacity: 0,
          y: -40,
          pointerEvents: "none",
          ease: "power2.in",
          duration: 0.45
        }, start + 0.6);
      });

      // --- FASE 3: Final Layer fade-in (Frames 166-240 -> approx 68% to 100%) ---
      // Fade in the solid light backing page to hide canvas noise and guarantee legibility
      mainTimeline.to("#light-background", {
        opacity: 0.96, // Near solid light-grey cover
        ease: "power1.in",
        duration: 1.5
      }, 7.5);

      mainTimeline.to("#final-layer", {
        opacity: 1,
        pointerEvents: "auto",
        ease: "power2.out",
        duration: 1.5,
      }, 8.0);

      mainTimeline.to("#final-layer-content", {
        y: 0,
        ease: "power2.out",
        duration: 1.5,
      }, 8.0);
    };

    // Magnetic effect on WhatsApp CTA button
    const ctaBtn = document.querySelector(".magnetic-btn");
    const handleMouseMove = (e) => {
      const rect = ctaBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsapRaw.to(ctaBtn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsapRaw.to(ctaBtn, {
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
      if (mainTimeline) {
        mainTimeline.kill();
      }
      if (ctaBtn) {
        ctaBtn.removeEventListener("mousemove", handleMouseMove);
        ctaBtn.removeEventListener("mouseleave", handleMouseLeave);
      }
      // Clear image cache on unmount
      imagesRef.current = [];
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
      
      {/* Light Noon Background for Fase 3 (bloom) - Opaque White backing panel */}
      <div 
        id="light-background" 
        className="fixed inset-0 bg-[#f7f7f9] opacity-0 -z-10 pointer-events-none"
      />

      {/* Loading Placeholder with progress counter */}
      {!videoLoaded && (
        <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-brand-purple border-t-transparent animate-spin" />
            <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
              CARREGANDO JORNADA ({loadProgress}%)
            </p>
          </div>
        </div>
      )}
    </>
  );
}
