const API_BASE = (import.meta.env.VITE_API_BASE as string) || "http://localhost:8000";

export async function fetchHelmets() {
  const res = await fetch(`${API_BASE}/helmets`);
  if (!res.ok) throw new Error(`Failed fetching helmets: ${res.status}`);
  const data = await res.json();
  console.log("Helmets data:", data);
  return data;
}

export default API_BASE;
