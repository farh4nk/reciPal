import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home">
      {/* Top breadcrumb-ish navbar spacer (your Navbar is separate) */}
      <section className="hero">
        <div className="hero__icon" aria-hidden>🍽️</div>
        <h1 className="hero__title">
          AI-Powered Recipe<br />Sharing for Modern Cooks
        </h1>
        <p className="hero__subtitle">
          Share your favorite recipes, let AI monitor your pantry ingredients, and
          get personalized cooking recommendations and grocery lists.
        </p>

        <div className="hero__cta">
          <Link to="/recipes" className="btn btn--solid">🍲 Explore Recipes</Link>
          <Link to="/ai" className="btn btn--ghost">✨ Try AI Features</Link>
        </div>
      </section>

      <section className="features">
        <h2 className="features__title">Everything you need for smarter cooking</h2>
        <p className="features__subtitle">
          From recipe discovery to grocery planning, reciPal uses AI to make your
          cooking journey effortless and enjoyable.
        </p>

        <div className="grid">
          <article className="card">
            <header className="card__head">
              <span className="card__icon" aria-hidden>🧾</span>
              <h3 className="card__title">Recipe Sharing</h3>
            </header>
            <p className="card__body">
              Discover and share amazing recipes with a community of passionate cooks
            </p>
            <Link to="/recipes" className="card__action">Browse Recipes</Link>
          </article>

          <article className="card">
            <header className="card__head">
              <span className="card__icon" aria-hidden>🧰</span>
              <h3 className="card__title">Smart Pantry</h3>
            </header>
            <p className="card__body">
              AI monitors your ingredients and suggests recipes based on what you have
            </p>
            <Link to="/pantry" className="card__action">Manage Pantry</Link>
          </article>

          <article className="card">
            <header className="card__head">
              <span className="card__icon" aria-hidden>🛒</span>
              <h3 className="card__title">Grocery Lists</h3>
            </header>
            <p className="card__body">
              Automatically generate shopping lists from your favorite recipes
            </p>
            <Link to="/grocery" className="card__action">View Lists</Link>
          </article>

          {/* <article className="card">
            <header className="card__head">
              <span className="card__icon" aria-hidden>🤖</span>
              <h3 className="card__title">AI Recommendations</h3>
            </header>
            <p className="card__body">
              Get personalized recipe suggestions based on your preferences and dietary needs
            </p>
            <Link to="/ai" className="card__action">Get Suggestions</Link>
          </article> */}

          {/* <article className="card">
            <header className="card__head">
              <span className="card__icon" aria-hidden>👥</span>
              <h3 className="card__title">Community</h3>
            </header>
            <p className="card__body">
              Connect with fellow food enthusiasts and share your culinary creations
            </p>
            <Link to="/community" className="card__action">Join In</Link>
          </article> */}

          {/* <article className="card">
            <header className="card__head">
              <span className="card__icon" aria-hidden>🗓️</span>
              <h3 className="card__title">Meal Planning</h3>
            </header>
            <p className="card__body">
              Plan weekly meals and automatically organize your shopping needs
            </p>
            <Link to="/planner" className="card__action">Start Planning</Link>
          </article> */}
        </div>
      </section>
    </main>
  );
}
