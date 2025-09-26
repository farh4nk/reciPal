import { Link } from "react-router-dom";

export default function User() {
  // TODO: replace with real DB/user context
  const user = { username: "Chef", email: "you@example.com" };
  const savedRecipes = [
    { id: "creamy-mushroom-risotto", title: "Creamy Mushroom Risotto" },
    { id: "lemon-pepper-chicken", title: "Lemon Pepper Chicken" },
  ];
  const pantryCount = 7;

  return (
    <main className="page container" style={{ maxWidth: 720 }}>
      <h1 className="page__title">Dashboard</h1>
      <p className="page__subtitle">Welcome back, {user.username} 👋</p>

      {/* Stats */}
      <section className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ margin: "0 0 10px", fontSize: "18px", fontWeight: "700" }}>
          Your Stats
        </h2>
        <p style={{ margin: "6px 0" }}>
          <b>{savedRecipes.length}</b> saved recipes
        </p>
        <p style={{ margin: "6px 0" }}>
          <b>{pantryCount}</b> items in pantry
        </p>
      </section>

      {/* Saved Recipes */}
      <section className="card" style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
            Saved Recipes
          </h2>
          <Link to="/recipes" style={{ color: "var(--accent)", fontWeight: 600 }}>
            View all
          </Link>
        </div>

        {savedRecipes.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>
            You haven’t saved any recipes yet.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {savedRecipes.map((r) => (
              <li
                key={r.id}
                style={{
                  padding: "6px 0",
                  borderBottom: "1px solid var(--card-border)",
                }}
              >
                <Link to={`/recipes/${r.id}`} style={{ fontWeight: 600 }}>
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Account */}
      <section className="card" style={{ marginBottom: 56 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
            Account
          </h2>
          <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Log out
          </Link>
        </div>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Signed in as <b>{user.email}</b>
        </p>
      </section>
    </main>
  );
}
