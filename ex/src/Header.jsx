import { useEffect } from "react";
import "./Header.css";

function Header() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/finisher-header.es5.min.js";
    script.async = true;
    script.onload = () => {
      new window.FinisherHeader({
        count: 12,
        size: { min: 1300, max: 1500, pulse: 0 },
        speed: {
          x: { min: 0.6, max: 3 },
          y: { min: 0.6, max: 3 },
        },
        colors: {
          background: "#2f2f2f",
          particles: ["#1e1e1e", "#C42140",],
        },
        blending: "overlay",
        opacity: { center: 0.6, edge: 0.1 },
        skew: 0,
        shapes: ["c"],
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div className="finisher-header"></div>;
}

export default Header;