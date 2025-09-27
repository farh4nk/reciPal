import { Link } from "react-router-dom";
import { getAllRecipes} from "../api_funcs/recipes.js";

const recipes = await getAllRecipes();



export default function Recipes() {
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

      {/* Search (kept for when you have many titles) */}
      <section className="container">
        <div className="searchbar">
          <span className="searchbar__icon" aria-hidden>🔎</span>
          <input
            className="searchbar__input"
            placeholder="Search recipe titles…"
          />
        </div>
      </section>

      {/* Grid of simple title-only cards */}
      <section className="grid grid--recipes">
        {Array.isArray(recipes) && recipes.length ? (
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
        <Link to={`/recipes/${recipe.title}`} className="btn btn--ghost sm">
          View Recipe
        </Link>
      </div>
    </article>
  );
}
