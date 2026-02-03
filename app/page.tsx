import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1a1a2e, #000)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 600 }}>
        {/* Logo / Title */}
        <h1
          style={{
            fontSize: "4rem",
            letterSpacing: "0.15em",
            marginBottom: 10,
            textShadow: "0 0 15px #ff2cdf",
          }}
        >
          WEEB CULT
        </h1>

        <p
          style={{
            opacity: 0.85,
            marginBottom: 40,
            fontSize: "1.1rem",
          }}
        >
          Where warriors gather.  
          Anime. Chaos. Community.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <Link href="/register">
            <button
              style={{
                padding: "12px 28px",
                fontSize: "1rem",
                background: "linear-gradient(90deg, #ff2cdf, #7b2cff)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 0 15px rgba(255,44,223,0.6)",
              }}
            >
              Join the Cult
            </button>
          </Link>

          <Link href="/login">
            <button
              style={{
                padding: "12px 28px",
                fontSize: "1rem",
                background: "transparent",
                border: "1px solid #7b2cff",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Enter
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
