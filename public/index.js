import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// ------------------- STYLES (inline for simplicity) -------------------
const navbar = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", backgroundColor: "#0f172a", color: "#fff", position: "relative" };
const navLinks = { display: "flex", gap: "20px" };
const hamburgerStyle = { fontSize: "28px", cursor: "pointer" };
const heroStyle = { textAlign: "center", padding: "80px 20px", backgroundColor: "#f0f4f8" };
const taglineStyle = { fontSize: "1.2rem", color: "#555", marginTop: "12px" };
const productsSection = { textAlign: "center", padding: "50px 20px" };
const productsGrid = { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" };
const productImage = { width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" };
const btnSecondary = { display: "inline-block", padding: "12px 24px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", marginTop: "20px" };
const footerStyle = { textAlign: "center", padding: "20px", backgroundColor: "#0f172a", color: "#fff" };

// ------------------- MAIN COMPONENT -------------------
const App = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const taglines = [
    "Mama's Best Shop for All Things Baby",
    "Caring for Your Little Ones",
    "Quality Baby Essentials You Can Trust",
    "Where Every Baby Matters"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav style={navbar}>
        <div>
          <img src="images/logo.png" alt="Logo" style={{ height: "40px" }} />
        </div>

        <div className="nav-links" style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: menuOpen ? "flex" : "none", flexDirection: "column", position: "absolute", top: "60px", right: "20px", backgroundColor: "#0f172a", borderRadius: "8px", padding: "10px", gap: "10px" }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a>
            <a href="/products" style={{ color: "#fff", textDecoration: "none" }}>Products</a>
            <a href="/about" style={{ color: "#fff", textDecoration: "none" }}>About</a>
          </div>

          <div style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
            &#9776;
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={heroStyle}>
        <h1>Welcome to Zani Baby Shop</h1>
        <p style={taglineStyle}>{taglines[taglineIndex]}</p>
      </header>

      {/* Featured Products */}
      <section style={productsSection}>
        <h2>Featured Products</h2>
        <div style={productsGrid}>
          <img src="images/1.png" alt="Product 1" style={productImage} />
          <img src="images/2.png" alt="Product 2" style={productImage} />
          <img src="images/4.png" alt="Product 4" style={productImage} />
        </div>
        <a href="/products" style={btnSecondary}>View All Products</a>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <p>&copy; 2026 Zani Baby Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

// ------------------- RENDER -------------------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
