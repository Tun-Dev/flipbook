import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const canvas = document.getElementById("flipbook_canvas");
    const context = canvas.getContext("2d");
    const frameCount = 107;
    const currentFrame = (index) => {
      return `/imgs/ezgif-frame-${index.toString().padStart(3, "0")}.png`; // 000, 001, 002, ..., 999, To padStart(3, "0") means 3 digits, and fill the rest with 0
    };

    // This is the first frame to load on the page
    const img = new Image();
    img.src = currentFrame(0);
    img.onload = function () {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // This is the function to preload all the images
    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };

    // This is the function to update the image
    const updateImage = (index) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // This is the function to scroll the page and update the image while scrolling
    window.addEventListener("scroll", () => {
      const html = document.documentElement;
      const wrap = document.querySelector(".App");
      const scrollTop = html.scrollTop - wrap.offsetTop;
      const maxScrollTop = wrap.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );
      requestAnimationFrame(() => updateImage(frameIndex + 1));

      // if (scrollTop > 10) {
      //   document.querySelector(".heroWrap_sticky").classList.add("fixed");
      // } else {
      //   document.querySelector(".heroWrap_sticky").classList.toggle("fixed");
      // }
    });

    preloadImages();
  }, []);

  return (
    <div className="App">
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        data-pin-scroll
        className="flipbook_canvas"
        id="flipbook_canvas"
      ></canvas>
    </div>
  );
}

export default App;
