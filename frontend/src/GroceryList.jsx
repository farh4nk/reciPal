import { useEffect, useState } from "react";

export default function GroceryList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      // Example shape your backend should return:
      // [{ id: "milk", label: "Whole milk (1 gal)" }, ...]
      const recommended = [
        { id: "milk", label: "Whole milk (1 gal)" },
        { id: "eggs", label: "Eggs (dozen)" },
        { id: "pasta", label: "Spaghetti pasta" },
        { id: "tomato-sauce", label: "Tomato sauce" },
      ];
      setItems(recommended);
    }
    load();
  }, []);

  const handleCheck = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <main className="page container" style={{ maxWidth: 720 }}>
      <h1 className="page__title">Grocery List</h1>
      <p className="page__subtitle">Recommended ingredients to buy.</p>

      <section className="card" style={{ padding: "14px 16px" }}>
        {items.length === 0 ? (
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Your list is empty.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--card-border)",
                }}
              >
                <input
                  type="checkbox"
                  aria-label={`Mark ${item.label} as purchased`}
                  onChange={() => handleCheck(item.id)}
                  className="grocery__check"
                  style={{
                    width: 18,
                    height: 18,
                    border: "1px solid var(--card-border)",
                    borderRadius: 4,
                    appearance: "none",
                    outline: "none",
                    display: "grid",
                    placeItems: "center",
                    background: "#fff",
                  }}
                  onClick={(e) => {
                    if (e.target.checked) {
                      e.target.style.background = "var(--accent)";
                      e.target.style.borderColor = "var(--accent)";
                      e.target.style.color = "#fff";
                      e.target.innerText = "✓";
                    }
                  }}
                />
                <span style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
