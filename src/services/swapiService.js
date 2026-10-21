const BASE_URL = "https://swapi.dev/api";

export const CATEGORIES = {
  people: "Personajes",
  planets: "Planetas",
  starships: "Naves",
  films: "Películas",
};

export async function fetchCategory(category, page = 1) {
  const res = await fetch(`${BASE_URL}/${category}/?page=${page}`);
  if (!res.ok) throw new Error(`Error al cargar ${category}`);
  return res.json();
}

export async function searchCategory(category, query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/${category}/?search=${encodeURIComponent(query)}&page=${page}`,
  );
  if (!res.ok) throw new Error(`Error al buscar en ${category}`);
  return res.json();
}

export async function fetchById(category, id) {
  const res = await fetch(`${BASE_URL}/${category}/${id}/`);
  if (!res.ok) throw new Error(`Error al cargar el detalle`);
  return res.json();
}

export function extractIdFromUrl(url) {
  if (!url) return null;
  const parts = url.replace(/\/$/, "").split("/");
  return parts[parts.length - 1];
}

export function getCategoryFromUrl(url) {
  if (!url) return null;
  const match = url.match(/\/api\/(\w+)\//);
  return match ? match[1] : null;
}
