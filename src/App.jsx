import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    // Initial setup for elements
    gsap.set(".main", { scale: 1.7, rotate: -10 });
    gsap.set(".sky", { scale: 1.5, rotate: -20 });
    gsap.set(".bg", { scale: 1.8, rotate: -3 });
    gsap.set(".character", { scale: 1.5, rotate: -20, bottom: "-150%", left: "50%", x: "-50%" });
    gsap.set(".text", { scale: 1.4, rotate: -10 });

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: 0,
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: 0.2,
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.3,
      rotate: 0,
      duration: 2,
      delay: 0.2,
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 0.8,
      x: "-50%",
      bottom: "-60%",
      rotate: 0,
      duration: 2,
      delay: 0.4,
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: 0.3,
      ease: "Expo.easeInOut",
    });

    // Stagger animation for text lines
    gsap.fromTo(".text h1", 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        delay: 0.8,
        stagger: 0.2,
        ease: "Power3.easeOut"
      }
    );

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 30;
      const yMove = (e.clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(".sky", {
        x: xMove * 0.8,
        y: yMove * 0.3,
        duration: 1,
        ease: "Power2.easeOut"
      });
      gsap.to(".bg", {
        x: xMove * 1.5,
        y: yMove * 0.5,
        duration: 0.6,
        ease: "Power2.easeOut"
      });
      gsap.to(".character", {
        x: `${-50 + xMove * 0.2}%`,
        duration: 1.2,
        ease: "Power2.easeOut"
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="280"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="pricedown"
                  fontWeight="900"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-8 px-8 md:py-12 md:px-12">
              <div className="logo flex items-center gap-6">
                <div className="lines flex flex-col gap-[6px]">
                  <div className="line w-12 h-[3px] bg-white rounded-full"></div>
                  <div className="line w-8 h-[3px] bg-white rounded-full"></div>
                  <div className="line w-6 h-[3px] bg-white rounded-full"></div>
                </div>
                <h3 className="text-3xl md:text-4xl -mt-1 leading-none text-white font-bold tracking-wider">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-2 absolute top-4 md:top-6 left-1/2 -translate-x-1/2 text-center z-10">
                <h1 className="text-[5rem] md:text-[7rem] lg:text-[9rem] leading-none text-shadow text-white font-black tracking-tighter text-outline text-left">
                  grand
                </h1>
                <h1 className="text-[5rem] md:text-[7rem] lg:text-[9rem] leading-none text-shadow text-white font-black tracking-tighter text-outline text-left ml-16 md:ml-24 lg:ml-32">
                  theft
                </h1>
                <h1 className="text-[5rem] md:text-[7rem] lg:text-[9rem] leading-none text-shadow text-white font-black tracking-tighter text-outline text-left">
                  auto
                </h1>
              </div>
              <img
                className="absolute character left-1/2 -translate-x-1/2 z-20"
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-8 px-8 md:py-12 md:px-12 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="flex gap-4 items-center animate-bounce">
                <i className="text-3xl md:text-4xl ri-arrow-down-line"></i>
                <h3 className="text-lg md:text-xl font-light tracking-wide" style={{ fontFamily: 'Helvetica Now Display, sans-serif' }}>
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[45px] md:h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          
          <div className="w-full min-h-screen bg-black py-16 px-8">
            <div className="cntnr flex flex-col lg:flex-row text-white w-full max-w-7xl mx-auto gap-12 lg:gap-16 items-center">
              <div className="limg relative w-full lg:w-1/2 h-[500px] lg:h-[700px] flex items-end justify-center">
                <img
                  className="h-full object-contain max-w-[400px] lg:max-w-[500px] drop-shadow-2xl"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-full lg:w-1/2 flex flex-col justify-center space-y-6 lg:space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight gradient-text font-black">
                    Still Running,
                  </h1>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight gradient-text font-black">
                    Not Hunting
                  </h1>
                </div>
                
                <div className="space-y-6 text-gray-300">
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ fontFamily: 'Helvetica Now Display, sans-serif' }}>
                    Experience the ultimate open-world adventure in Vice City. Navigate through neon-lit streets, 
                    build your criminal empire, and live the life of luxury and danger in this reimagined classic.
                  </p>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ fontFamily: 'Helvetica Now Display, sans-serif' }}>
                    With enhanced graphics, immersive gameplay, and endless possibilities, Grand Theft Auto VI 
                    pushes the boundaries of what's possible in gaming. Every choice matters, every action has consequences.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-400" style={{ fontFamily: 'Helvetica Now Display, sans-serif' }}>
                    Available exclusively on PlayStation 5. Pre-order now and get exclusive in-game content, 
                    including bonus vehicles, weapons, and access to premium locations.
                  </p>
                </div>
                
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 text-black text-lg md:text-xl lg:text-2xl font-bold rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 w-fit">
                  <span className="flex items-center gap-3">
                    Download Now
                    <i className="ri-download-line"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Additional footer section */}
          <div className="w-full bg-gradient-to-t from-gray-900 to-black py-16 px-8">
            <div className="max-w-7xl mx-auto text-center text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="space-y-4">
                  <i className="ri-gamepad-line text-4xl text-yellow-500"></i>
                  <h3 className="text-xl font-bold">Next-Gen Gaming</h3>
                  <p className="text-gray-400" style={{ fontFamily: 'Helvetica Now Display, sans-serif' }}>
                    Experience unprecedented realism with ray tracing and 4K graphics
                  </p>
                </div>
                <div className="space-y-4">
                  <i className="ri-global-line text-4xl text-yellow-500"></i>
                  <h3 className="text-xl font-bold">Massive World</h3>
                  <p className="text-gray-400" style={{ fontFamily: 'Helvetica Now Display, sans-serif' }}>
                    Explore the largest and most detailed open world ever created
                  </p>
                </div>
                <div className="space-y-4">
                  <i className="ri-group-line text-4xl text-yellow-500"></i>
                  <h3 className="text-xl font-bold">Online Multiplayer</h3>
                  <p className="text-gray-400" style={{ fontFamily: 'Helvetica Now Display, sans-serif' }}>
                    Join millions of players in the ultimate online experience
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-500 text-sm" style={{ fontFamily: 'Helvetica Now Display, sans-serif' }}>
                  © 2024 Rockstar Games. All rights reserved. Grand Theft Auto and related marks are trademarks of Take-Two Interactive Software, Inc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;