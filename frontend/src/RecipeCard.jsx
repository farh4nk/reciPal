// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getRecipeById, editRecipe } from "../api_funcs/recipes.js";

// export default function RecipeCard() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [error, setError] = useState(null);
// //pip install requirements.txt
// //python manage.py runserver
//   useEffect(() => {
//     const ac = new AbortController();
//     (async () => {
//       try {
//         const data = await getRecipeById(id, { signal: ac.signal });
//         setRecipe({ ...data, author: "Mr. Robot" });
//       } catch (e) {
//         if (e.name !== "AbortError") setError(e);
//       }
//     })();
//     return () => ac.abort();
//   }, [id]);

//   if (error) return <main className="page container">Error: {String(error.message || error)}</main>;
//   if (!recipe) return <main className="page container">Loading…</main>;

//   return (
//     <main className="page container">
//       <Link to="/recipes" className="back-link">← Back to Recipes</Link>

//       <article className="recipe-detail card">
//         <header className="recipe-detail__head">
//           <h1 className="recipe-detail__title">{recipe.title}</h1>
//           <p className="recipe-detail__author">by {recipe.author}</p>
//         </header>

//         <p className="recipe-detail__transcript">{recipe.caption}</p>

//         <section className="recipe-detail__section">
//           <h2>Ingredients</h2>
//           <ul className="recipe-detail__list">
//             {(recipe.ingredients ?? []).map((item, i) => (
//               <li key={i}>{Array.isArray(item) ? item.join(" ") : String(item)}</li>
//             ))}
//           </ul>
//         </section>

//         <section className="recipe-detail__section">
//           <h2>Steps</h2>
//           <ol className="recipe-detail__list">
//             {(recipe.steps ?? []).map((step, i) => <li key={i}>{step}</li>)}
//           </ol>
//         </section>
//       </article>
//     </main>
//   );
// }

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipeById, editRecipe } from "../api_funcs/recipes.js";

export default function RecipeCard() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [steps, setSteps] = useState([]);
  const [originalSteps, setOriginalSteps] = useState([]);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const data = await getRecipeById(id, { signal: ac.signal });
        setRecipe({ ...data, author: "Mr. Robot" });
        setSteps(data.steps ?? []);
        setOriginalSteps(data.steps ?? []);
      } catch (e) {
        if (e.name !== "AbortError") setError(e);
      }
    })();
    return () => ac.abort();
  }, [id]);

  const handleStepChange = (i, value) => {
    setSteps((prev) => prev.map((s, idx) => (idx === i ? value : s)));
  };

  const handleAddStep = () => {
    setSteps((prev) => [...prev, ""]);
  };

  const handleSaveSteps = async () => {
    if (!recipe) return;
    try {
      setSaving(true);

      const thisID = recipe.id;

      console.log(
        "4",
        recipe.title,
        recipe.name,
        recipe.caption,
        recipe.ingredients,
        steps
      );
      const updated = await editRecipe(
        id,
        {
          name: recipe.name,
          caption: recipe.caption,
          ingredients: recipe.ingredients ?? [],
          steps, // updated steps
        },
      );

      setRecipe(updated);
      setOriginalSteps(updated.steps ?? []);
      setEditing(false);
    } catch (err) {
      console.error("Failed to save steps:", err);
      setError(err);
    } finally {
      setSaving(false);
    }
  };

  const stepsChanged = JSON.stringify(steps) !== JSON.stringify(originalSteps);

  if (error) {
    return (
      <main className="page container">
        Error: {String(error.message || error)}
      </main>
    );
  }
  if (!recipe) {
    return <main className="page container">Loading…</main>;
  }

  return (
    <main className="page container">
      <Link to="/recipes" className="back-link">
        ← Back to Recipes
      </Link>

      <article className="recipe-detail card">
        <header className="recipe-detail__head">
          <h1 className="recipe-detail__title">{recipe.title}</h1>
          <p className="recipe-detail__author">by {recipe.author}</p>
        </header>

        <p className="recipe-detail__transcript">{recipe.caption}</p>

        <section className="recipe-detail__section">
          <h2>Ingredients</h2>
          <ul className="recipe-detail__list">
            {(recipe.ingredients ?? []).map((item, i) => (
              <li key={i}>
                {Array.isArray(item) ? item.join(" ") : String(item)}
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe-detail__section">
          <h2>Steps</h2>
          <ol className="recipe-detail__list">
            {steps.map((step, i) => (
              <li key={i}>
                {editing ? (
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleStepChange(i, e.target.value)}
                  />
                ) : (
                  step
                )}
              </li>
            ))}
          </ol>

          {!editing && (
            <button onClick={() => setEditing(true)}>Edit Steps</button>
          )}

          {editing && (
            <>
              <button onClick={handleAddStep}>+ Add Step</button>
              {stepsChanged && (
                <button
                  onClick={handleSaveSteps}
                  disabled={saving}
                  className="save-btn"
                  style={{
                    marginLeft: "1rem",
                    background: "green",
                    color: "white",
                  }}
                >
                  {saving ? "Saving…" : "Save Steps"}
                </button>
              )}
            </>
          )}
        </section>
      </article>
    </main>
  );
}
