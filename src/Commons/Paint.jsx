import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function Paint({ painting, tiny }) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const fullUrl = `https://dreamer-paintings.vercel.app/${painting}`;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    // Evita que el fondo scrollee mientras el modal está abierto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="painting">
      <img
        src={tiny}
        alt="Dreamer Paintings"
        loading="lazy"
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer" }}
      />
      {open &&
        createPortal(
          <div
            className="paint-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Dreamer Paintings"
            onClick={(e) => {
              // Solo cierra si el click fue en el fondo, no en la pintura ni en la X.
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <img
              className="paint-modal__image"
              src={fullUrl}
              alt="Dreamer Paintings"
              onClick={() => window.open(fullUrl, "_blank", "noopener,noreferrer")}
            />
            <button
              ref={closeBtnRef}
              type="button"
              className="paint-modal__close"
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

export default Paint;
