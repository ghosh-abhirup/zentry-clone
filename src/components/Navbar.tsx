import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowScroll } from "react-use";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const [hoverData, setHoverData] = useState({
    left: 0,
    width: "0px",
  });

  const { y: currentScroll } = useWindowScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    if (currentScroll === 0) {
      setIsNavVisible(true);
      navbarRef.current?.classList.remove("floating-nav");
    } else if (currentScroll > lastScrollY) {
      setIsNavVisible(false);
    } else if (currentScroll < lastScrollY) {
      setIsNavVisible(true);
      navbarRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScroll);
  }, [currentScroll, lastScrollY]);

  useEffect(() => {
    gsap.to(navbarRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const [isMouseHover, setIsMouseHover] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (navContainerRef.current) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const itemRect = event.currentTarget.getBoundingClientRect();

      const leftPosition = itemRect.left - containerRect.left;

      setHoverData({
        left: leftPosition,
        width: `${itemRect.width}px`,
      });
    }
  };

  useGSAP(() => {
    const hoverTL = gsap.timeline();

    hoverTL.to("#cursor-pill", {
      opacity: isMouseHover ? 1 : 0,
      ease: "power1.inOut",
      left: `${hoverData.left}px`,
      width: hoverData.width,
      duration: 0.3,
    });
  }, [isMouseHover, hoverData]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div ref={navbarRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button id="product-button" title="Products" righIcon={<TiLocationArrow />} containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1" />
          </div>

          <div className="h-full flex items-center">
            <div
              className="h-full items-center hidden md:flex gap-4 relative"
              id="nav-container"
              ref={navContainerRef}
              onMouseEnter={() => setIsMouseHover(true)}
              onMouseLeave={() => {
                setIsMouseHover(false);
              }}
            >
              {navItems?.map((item, index) => (
                <a href="" className="nav-hover" key={index} onMouseEnter={handleMouseEnter}>
                  {item}
                </a>
              ))}

              {/* cursor */}
              <div className={`absolute z-0 h-8 rounded-full bg-white w-0 opacity-0`} id="cursor-pill"></div>
            </div>

            <button onClick={toggleAudioIndicator} className="ml-10 flex items-center space-x-0.5">
              <audio src="/audio/loop.mp3" loop ref={audioElementRef} className="hidden" />
              {[1, 2, 3, 4].map((bar) => (
                <div key={bar} className={`indicator-line ${isIndicatorActive ? "active" : ""}`} style={{ animationDelay: `${bar * 0.1}s` }} />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
