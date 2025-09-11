const API_BASE_URL = "https://68b826bcb715405043274639.mockapi.io/api";

export async function fetchProperties() {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/PropertyListing`);
    if (!res.ok) throw new Error("Failed to fetch properties");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("fetchProperties:", err);
    return [];
  }
}

export async function fetchPropertyById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/PropertyListing/${id}`);
    if (!res.ok) throw new Error("Failed to fetch property by id");
    return await res.json();
  } catch (err) {
    console.error("fetchPropertyById:", err);
    return null;
  }
}
