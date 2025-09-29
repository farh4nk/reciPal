import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../api_funcs/recipes.js";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setError(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  return (
    <main className="page">
      {/* Page header and Search combined */}
      <div
        className="page__head container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start", // Align items to the top
          marginBottom: "2rem",
        }}
      >
        {/* LEFT SIDE: Title, Subtitle, and CTA Button */}
        <div>
          <h1 className="page__title">Recipe Collection</h1>
          <p className="page__subtitle" style={{ marginBottom: "1rem" }}>
            Discover and share recipes transcribed from your audio/video.
          </p>
          <Link to="/recipes/new" className="btn btn--solid page__cta">
            ＋ Add Recipe
          </Link>
        </div>

        {/* RIGHT SIDE: Search bar */}
        <section
          style={{ width: '250px', padding: 0, marginTop: '8.0rem' }} // Align search bar visually
        >
          <div
            className="searchbar"
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #e0e0e0",
              borderRadius: "25px", 
              padding: "0.5rem 1rem",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
              width: "100%",
            }}
          >
            <span
              className="searchbar__icon"
              aria-hidden
              style={{
                marginRight: "0.75rem",
                fontSize: "1.2rem",
                color: "#757575",
              }}
            >
              🔎
            </span>
            <input
              className="searchbar__input"
              placeholder="Search recipe titles…"
              // You'll need to add value={query} and onChange={(e) => setQuery(e.target.value)} here
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                padding: 0,
                fontSize: "1rem",
                color: "#333",
                width: "100%",
              }}
            />
          </div>
        </section>
      </div>

    

      {/* Grid */}
      <section className="grid grid--recipes">
        {loading ? (
          <p className="muted">Loading…</p>
        ) : error ? (
          <p className="muted">Failed to load: {String(error.message || error)}</p>
        ) : recipes.length ? (
          recipes.map((r) => <RecipeTitleCard key={r.id ?? r.title} recipe={r} />)
        ) : (
          <p className="muted">No recipes yet.</p>
        )}
      </section>
    </main>
  );
}

function RecipeTitleCard({ recipe }) {
  return (
    <article className="card recipe recipe--minimal">
      <h3 className="recipe__title">{recipe.title}</h3>
      <div className="recipe__actions">
        <Link to={`/recipes/${recipe.id}`} className="btn btn--ghost sm">
          View Recipe
        </Link>
      </div>
    </article>
  );
}
