import { useState } from "react";

function Paint({ painting, tiny }) {
  const [open, setOpen] = useState(false);
  const fullUrl = `https://dreamer-paintings.vercel.app/${painting}`;

  return (
    <div className="painting">
      <img
        src={tiny}
        alt="Dreamer Paintings"
        loading="lazy"
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer" }}
      />
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <img
            src={fullUrl}
            alt="Dreamer Paintings"
            onClick={(e) => {
              e.stopPropagation();
              window.open(fullUrl, "_blank");
            }}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "white",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              borderRadius: "50%",
              width: "2.5rem",
              height: "2.5rem",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Paint;
