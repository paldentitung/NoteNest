const API_URL = `http://localhost:3000/api/notes`;

export const getNotes = async () => {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`Failed to fetch notes (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    alert(error);
    throw error;
  }
};
