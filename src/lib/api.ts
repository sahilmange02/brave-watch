const API_BASE = (import.meta.env.VITE_API_BASE as string) || "http://localhost:8000";

export async function fetchHelmets() {
  const res = await fetch(`${API_BASE}/helmets`);
  if (!res.ok) throw new Error(`Failed fetching helmets: ${res.status}`);
  return res.json();
}

export default API_BASE;
