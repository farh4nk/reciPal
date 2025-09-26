import { Link } from "react-router-dom";

const mockRecipe = {
  id: "creamy-mushroom-risotto",
  title: "Creamy Mushroom Risotto",
  // future fields (generated from audio) will live in DB
};



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
        <RecipeTitleCard recipe={mockRecipe} />
        {/* Later: {recipes.map(r => <RecipeTitleCard key={r.id} recipe={r} />)} */}
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
