import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CanvasSequenceProps {
  frameCount: number;
  framePath: (index: number) => string;
  className?: string;
  scrollContainer?: string;
}

export function CanvasSequence({ 
  frameCount, 
  framePath, 
  className = '',
  scrollContainer = '#hero-section'
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions to the video dimensions
    canvas.width = 834;
    canvas.height = 1112;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      images.push(img);
    }

    // Render the first frame as soon as it loads
    images[0].onload = render;

    function render() {
      const frameIndex = Math.round(airpods.frame);
      if (images[frameIndex] && images[frameIndex].complete) {
        context?.drawImage(images[frameIndex], 0, 0);
      }
    }

    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      // Create the scroll trigger to scrub through the frames
      gsap.to(airpods, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top top",
          end: "+=150%", // How far the user has to scroll to finish the animation
          scrub: 0.5, // 0.5s smoothing on the scrub for buttery feel
          pin: true,
        },
        onUpdate: render,
      });
    });

    return () => {
      mm.revert();
    };
  }, [frameCount, framePath, scrollContainer]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
    />
  );
}
