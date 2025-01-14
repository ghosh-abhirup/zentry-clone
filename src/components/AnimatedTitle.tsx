import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  containerClass: string;
}

const AnimatedTitle = ({ title, containerClass }: AnimatedTitleProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "-=200 center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0) rotateX(0)",

        ease: "power2.inOut",
        stagger: 0.02,
      });

      return () => ctx.revert();
    }, containerRef);
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br />").map((line, index) => (
        <div className="max-w-full flex-center gap-2 px-10 flex-wrap md:gap-3" key={index}>
          {line.split(" ").map((word, i) => (
            <span key={i} className="animated-word" dangerouslySetInnerHTML={{ __html: word }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
