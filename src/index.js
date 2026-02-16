import React, { useState, useEffect } from "react";
import category1 from '../images/1.png';
import category2 from '../images/2.png';
import category3 from '../images/3.png';
import background from '../images/background.png';

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
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <nav style={{ padding: "15px", backgroundColor: "rgba(15, 23, 42, 0.8)" }}>
        <h3>Zani Baby Shop</h3>
      </nav>

      <header style={{ textAlign: "center", padding: "60px 20px" }}>
        <h1>Welcome to Zani Baby Shop</h1>
        <p style={{ marginTop: "10px" }}>{taglines[taglineIndex]}</p>
      </header>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "40px" }}>
        <img src={category1} alt=" 1" style={{ width: "200px", borderRadius: "10px" }} />
        <img src={category2} alt=" 2" style={{ width: "200px", borderRadius: "10px" }} />
        <img src={category3} alt=" 3" style={{ width: "200px", borderRadius: "10px" }} />
      </div>

      <footer style={{ textAlign: "center", padding: "20px", backgroundColor: "rgba(15, 23, 42, 0.8)", marginTop: "60px" }}>
        <p>&copy; 2026 Zani Baby Shop</p>
      </footer>
    </div>
  );
}

export default App;
