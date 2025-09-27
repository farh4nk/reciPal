import React from "react";
import { Link } from "react-router-dom";

export default function NewRecipe() {
  const [inputValue, setInputValue] = React.useState("");
  // status: null | 'success' | 'error' | 'pending'
  const [status, setStatus] = React.useState(null);

  // submitLink returns a boolean (true = success, false = failure)
  const submitLink = async (title) => {
    // Basic validation: ensure this looks like an Instagram link
    const link = String(title || "").trim();
    if (!/instagram\.com\//i.test(link)) {
      // doesn't contain instagram.com/ -> fail quickly
      return false;
    }

    // Simulate async request; replace with real fetch when ready
    setStatus("pending");
    try {
      // example: const res = await fetch('/api/recipes', {method: 'POST', body: JSON.stringify({title: link})});
      // const ok = res.ok;
      await new Promise((r) => setTimeout(r, 300));
      const ok = true; // toggle to false to simulate failure
      return ok;
    } catch (e) {
      return false;
    }
  };
  return (
    <main className="page">
      <div className="page__head container" style={{ alignItems: "center" }}>
        <div>
          <h1 className="page__title">Add New Recipe</h1>
          <p className="page__subtitle">
            Create a new recipe by giving it a title.
          </p>
        </div>
        <Link to="/recipes" className="btn btn--ghost page__cta">
          ← Back
        </Link>
      </div>

      <section
        className="container"
        style={{ display: "flex", justifyContent: "center", paddingTop: 24 }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const title = inputValue.trim();
            if (!title) return; // no-op for empty

            const ok = await submitLink(title);
            if (ok) {
              setStatus("success");
              setInputValue("");
              // clear status after 3s
              setTimeout(() => setStatus(null), 3000);
            } else {
              setStatus("error");
              setTimeout(() => setStatus(null), 3000);
            }
          }}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <input
            aria-label="Recipe title"
            name="title"
            className="searchbar__input"
            placeholder="Recipe title..."
            style={{ maxWidth: 560, width: "60%" }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            style={{
              padding: "10px 18px",
              backgroundColor:
                status === "success"
                  ? "#2ecc71"
                  : status === "error"
                  ? "#e74c3c"
                  : undefined,
              color: status ? "white" : undefined,
              transition: "background-color 0.18s ease",
            }}
          >
            {status === "pending" ? "..." : "Create"}
          </button>
        </form>
      </section>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        {status === "success" && (
          <div style={{ color: "#2ecc71" }}>success!</div>
        )}
        {status === "error" && (
          <div style={{ color: "#e74c3c" }}>Error, please try again</div>
        )}
      </div>
    </main>
  );
}
