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
      {/* Page header */}
      <div className="page__head container">
        <div>
          <h1 className="page__title">Recipe Collection</h1>
          <p className="page__subtitle">
            Discover and share recipes transcribed from your audio/video.
          </p>
        </div>
        <Link to="/recipes/new" className="btn btn--solid page__cta">
          ＋ Add Recipe
        </Link>
      </div>

      {/* Search */}
      <section className="container">
        <div className="searchbar">
          <span className="searchbar__icon" aria-hidden>🔎</span>
          <input className="searchbar__input" placeholder="Search recipe titles…" />
        </div>
      </section>

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
