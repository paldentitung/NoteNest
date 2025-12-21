import toast from "react-hot-toast";

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
export const createNote = async (newNote) => {
  try {
    const formData = new FormData();
    formData.append("title", newNote.title);
    formData.append("subject", newNote.subject);
    formData.append("semester", newNote.semester);
    formData.append("description", newNote.description);
    formData.append("file", newNote.file);

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to create note");
    }

    const data = await res.json();
    return data.note;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
export const deleteNote = async (id) => {
  const res = fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  (await res).json();
};
