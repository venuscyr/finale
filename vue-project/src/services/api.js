const API_BASE_URL = "http://localhost:1338/api"; // Mettez ici l'URL de votre backend Strapi

// Fonction générique pour les requêtes GET
export async function get(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur dans get:", error);
    throw error;
  }
}

// Fonction générique pour les requêtes POST
export async function post(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur dans post:", error);
    throw error;
  }
}

// Fonction générique pour les requêtes PUT
export async function put(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur dans put:", error);
    throw error;
  }
}

// Fonction générique pour les requêtes DELETE
export async function remove(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur dans remove:", error);
    throw error;
  }
}
