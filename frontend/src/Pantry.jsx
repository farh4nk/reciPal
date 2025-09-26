// src/Pantry.jsx
import { useEffect, useRef, useState } from "react";

export default function Pantry() {
  const [items, setItems] = useState([]);                 // [{id, title, brand, barcode}]
  const [query, setQuery] = useState("");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(0);
  const detectorRef = useRef(null);

  // Start the camera + scanning loop
  const startScan = async () => {
    setError("");

    // Feature detect BarcodeDetector
    const supported =
      "BarcodeDetector" in window &&
      typeof window.BarcodeDetector === "function";

    if (!supported) {
      setError(
        "Barcode scanning not supported in this browser. Use Chrome/Edge, or add manually below."
      );
      return;
    }

    try {
      detectorRef.current = new window.BarcodeDetector({
        formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39"],
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setScanning(true);
      scanLoop(); // kick off detection
    } catch (e) {
      console.error(e);
      setError("Could not access the camera. Check permissions and try again.");
    }
  };

  // Stop camera + loop
  const stopScan = () => {
    cancelAnimationFrame(rafRef.current);
    setScanning(false);
    if (videoRef.current) videoRef.current.pause();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continuous detection loop
  const scanLoop = async () => {
    if (!videoRef.current || !detectorRef.current) return;

    try {
      const barcodes = await detectorRef.current.detect(videoRef.current);
      if (barcodes && barcodes.length) {
        const code = barcodes[0].rawValue || "";
        handleDetectedBarcode(code);
        stopScan();
        return;
      }
    } catch (e) {
      // Swallow intermittent decode errors; they’re normal during movement
    }
    rafRef.current = requestAnimationFrame(scanLoop);
  };

  // When a barcode is found, look it up and add to pantry
  const handleDetectedBarcode = async (barcode) => {
    const product = await mockLookup(barcode);
    const id = `${barcode}-${Date.now()}`;
    setItems((prev) => [{ id, barcode, ...product }, ...prev]);
  };

  // Mock product lookup (replace with your DB or API)
  async function mockLookup(barcode) {
    // simple demo mapping
    const known = {
      "012345678905": { title: "Spaghetti Pasta", brand: "Barilla" },
      "04963406": { title: "Tomato Sauce", brand: "Hunt's" },
      "036000291452": { title: "All-Purpose Flour", brand: "King Arthur" },
    };
    if (known[barcode]) return known[barcode];
    return {
      title: `Item ${barcode.slice(-4)}`,
      brand: "Unknown Brand",
    };
  }

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const filtered = items.filter((it) =>
    (it.title + " " + (it.brand || "") + " " + (it.barcode || ""))
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // Manual add fallback for unsupported browsers
  const [manualCode, setManualCode] = useState("");
  const addManual = async (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    await handleDetectedBarcode(manualCode.trim());
    setManualCode("");
  };

  return (
    <main className="page">
      <div className="page__head container">
        <div>
          <h1 className="page__title">Your Pantry</h1>
          <p className="page__subtitle">
            Scan a barcode to add items. Search to quickly find what you have.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {!scanning ? (
            <button className="btn btn--solid" onClick={startScan}>
              📷 Scan Barcode
            </button>
          ) : (
            <button className="btn btn--ghost" onClick={stopScan}>
              ✖ Stop
            </button>
          )}
        </div>
      </div>

      {/* Search bar */}
      <section className="container">
        <div className="searchbar">
          <span className="searchbar__icon" aria-hidden>
            🔎
          </span>
          <input
            className="searchbar__input"
            placeholder="Search pantry…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Scanner preview + errors */}
      {(scanning || error) && (
        <section className="container" style={{ marginBottom: 10 }}>
          {scanning && (
            <div
              className="card"
              style={{
                overflow: "hidden",
                padding: 0,
                borderRadius: "16px",
              }}
            >
              <video
                ref={videoRef}
                muted
                playsInline
                style={{ width: "100%", maxHeight: 360, objectFit: "cover" }}
              />
            </div>
          )}
          {error && (
            <p style={{ color: "var(--accent)", marginTop: 10 }}>{error}</p>
          )}
        </section>
      )}

      {/* Manual add (fallback) */}
      {error && (
        <section className="container" style={{ marginBottom: 24 }}>
          <form
            onSubmit={addManual}
            className="card"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              padding: 12,
            }}
          >
            <input
              className="searchbar__input"
              placeholder="Enter barcode manually"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
            />
            <button className="btn btn--solid sm" type="submit">
              Add
            </button>
          </form>
        </section>
      )}

      {/* Pantry list */}
      <section className="grid container" style={{ paddingBottom: 56 }}>
        {filtered.length === 0 ? (
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            {items.length === 0 ? (
              <p style={{ margin: 0, color: "var(--muted)" }}>
                Your pantry is empty. Click <b>Scan Barcode</b> to add your first
                item.
              </p>
            ) : (
              <p style={{ margin: 0, color: "var(--muted)" }}>
                No items match “{query}”.
              </p>
            )}
          </div>
        ) : (
          filtered.map((it) => (
            <article key={it.id} className="card" style={{ gridColumn: "span 12" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 4px" }}>{it.title}</h3>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
                    {it.brand || "—"} • <span>Barcode: {it.barcode}</span>
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn--ghost sm" onClick={() => removeItem(it.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
