import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglines = [
    "Mama's Best Shop for All Things Baby",
    "Caring for Your Little Ones",
    "Quality Baby Essentials You Can Trust",
    "Where Every Baby Matters",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <nav
        style={{
          padding: "15px",
          backgroundColor: "#0f172a",
          color: "white",
        }}
      >
        <h3>Zani Baby Shop</h3>
      </nav>

      <header
        style={{
          textAlign: "center",
          padding: "60px 20px",
          backgroundColor: "#f0f4f8",
        }}
      >
        <h1>Welcome to Zani Baby Shop</h1>
        <p style={{ marginTop: "10px" }}>{taglines[taglineIndex]}</p>
      </header>

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#0f172a",
          color: "white",
        }}
      >
        <p>&copy; 2026 Zani Baby Shop</p>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
