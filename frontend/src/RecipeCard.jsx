import { useParams, Link } from "react-router-dom";

export default function RecipeCard() {
  // when wired to DB, fetch recipe by id from params
  const { id } = useParams();

  // Mock recipe object
  const recipe = {
    id: "creamy-mushroom-risotto",
    title: "Creamy Mushroom Risotto",
    author: "Chef Maria",
    transcript:
      "This recipe was transcribed from audio. We'll cook mushrooms, toast arborio rice, and slowly add stock until creamy. Finish with parmesan.",
    ingredients: [
      "1 cup arborio rice",
      "2 cups vegetable stock",
      "1 cup mushrooms (sliced)",
      "1/2 cup grated parmesan",
      "2 tbsp olive oil",
      "Salt & pepper to taste",
    ],
    steps: [
      "Heat olive oil in a pan and sauté mushrooms.",
      "Add rice and toast for 1–2 minutes.",
      "Gradually add warm stock, stirring until absorbed.",
      "Continue until rice is creamy and tender.",
      "Stir in parmesan and season with salt & pepper.",
    ],
  };

  return (
    <main className="page container">
      <Link to="/recipes" className="back-link">← Back to Recipes</Link>

      <article className="recipe-detail card">
        <header className="recipe-detail__head">
          <h1 className="recipe-detail__title">{recipe.title}</h1>
          <p className="recipe-detail__author">by {recipe.author}</p>
        </header>

        <p className="recipe-detail__transcript">{recipe.transcript}</p>

        <section className="recipe-detail__section">
          <h2>Ingredients</h2>
          <ul className="recipe-detail__list">
            {recipe.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="recipe-detail__section">
          <h2>Steps</h2>
          <ol className="recipe-detail__list">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </article>
    </main>
  );
}
