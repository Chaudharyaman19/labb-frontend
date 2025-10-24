import React, { useEffect, useRef } from "react";
import "../../websitecss/css/cursor.css";
const CursorTrail = () => {
  const trailRef = useRef([]);

  useEffect(() => {
    let timeout;

    const handleMouseMove = (e) => {
      const colors = ["#ff0044", "#00ffcc", "#ffcc00", "#ff00ff", "#00ccff"];
      const circle = document.createElement("div");
      circle.className = "trail";
      circle.style.left = e.clientX + "px";
      circle.style.top = e.clientY + "px";
      circle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      document.body.appendChild(circle);
      trailRef.current.push(circle);

      // Fade out after 0.5s and remove
      timeout = setTimeout(() => {
        circle.style.opacity = 0;
        circle.style.transform += " scale(2)";
        setTimeout(() => {
          circle.remove();
          trailRef.current.shift();
        }, 500);
      }, 0);

      // Limit number of circles
      if (trailRef.current.length > 15) {
        const old = trailRef.current.shift();
        old.remove();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default CursorTrail;
