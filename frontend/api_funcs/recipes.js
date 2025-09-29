const BASE = "http://127.0.0.1:8000/api/recipes";

async function request(
  path,
  { method = "GET", headers = {}, body, signal } = {}
) {
  const url = `${BASE}${path}`;

  // If body is a plain object, send JSON
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;
  if (body && !isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const res = await fetch(url, { method, headers, body, signal });
  const text = await res.text();

  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      (data && (data.detail || data.error || JSON.stringify(data))) ||
      res.statusText;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// ---------- Endpoints (no auth) ----------

// GET /api/recipes/get/<title>  -> returns raw recipe.data JSON
export function getRecipeById(id, opts) {
  return request(`/get/${encodeURIComponent(id)}`, opts);
}

// GET /api/recipes/get/search/<title> -> returns array of RecipeSerializer items
export function searchRecipesByTitle(query, opts) {
  return request(`/get/search/${encodeURIComponent(query)}`, opts);
}

// GET /api/recipes/get/all/ -> returns all recipes (RecipeSerializer[])
export function getAllRecipes(opts) {
  return request(`/get/all/`, opts);
}

// POST /api/recipes/create  Body: { reel_url: "https://instagram.com/reel/..." }
export function createRecipeFromReel(reelUrl, opts) {
  return request(`/create`, {
    method: "POST",
    body: { reel_url: reelUrl },
    ...opts,
  });
}

// PUT /api/recipes/edit  Body: { title, data: {...} } -> replaces JSON fully
export function editRecipe(id, dataObj, opts) {
  return request(`/edit`, {
    method: "POST",
    body: { id: id, data: dataObj },
    ...opts,
  });
}
