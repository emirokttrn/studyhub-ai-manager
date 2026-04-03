import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);

    const baseUrl = "http://localhost:8080/notes";

    const getAllNotes = async () => {
        try {
            const response = await axios.get(baseUrl);
            setNotes(response.data);
        } catch (err) {
            setError("Notlar alınamadı.");
            console.error(err);
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post(baseUrl, {
                title: title,
                content: content,
            });

            setTitle("");
            setContent("");
            getAllNotes();
        } catch (err) {
            setError("Not eklenemedi.");
            console.error(err);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${baseUrl}/${id}`);
            getAllNotes();
        } catch (err) {
            setError("Not silinemedi.");
            console.error(err);
        }
    };

    const updateNote = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.put(`${baseUrl}/${editingId}`, {
                title: title,
                content: content,
            });

            setEditingId(null);
            setTitle("");
            setContent("");
            getAllNotes();
        } catch (err) {
            setError("Not güncellenemedi.");
            console.error(err);
        }
    };

    const handleSubmit = (e) => {
        if (editingId) {
            updateNote(e);
        } else {
            createNote(e);
        }
    };

    useEffect(() => {
        getAllNotes();
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>StudyHub AI Notes</h1>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Başlık gir"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                    />

                    <textarea
                        placeholder="İçerik gir"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={styles.textarea}
                    />

                    <button type="submit" style={styles.button}>
                        {editingId ? "Güncelle" : "Not Ekle"}
                    </button>
                </form>

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.noteList}>
                    {notes.length === 0 ? (
                        <p>Henüz not yok.</p>
                    ) : (
                        notes.map((note) => (
                            <div key={note.id} style={styles.noteCard}>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                                <small>Oluşturulma: {note.createdAt}</small>

                                <div style={styles.buttonGroup}>
                                    <button
                                        onClick={() => {
                                            setEditingId(note.id);
                                            setTitle(note.title);
                                            setContent(note.content);
                                        }}
                                        style={styles.editButton}
                                    >
                                        Düzenle
                                    </button>

                                    <button
                                        onClick={() => deleteNote(note.id)}
                                        style={styles.deleteButton}
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
    },
    container: {
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    title: {
        textAlign: "center",
        marginBottom: "24px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "24px",
    },
    input: {
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
    },
    textarea: {
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        minHeight: "120px",
        resize: "vertical",
    },
    button: {
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "#222",
        color: "#fff",
    },
    error: {
        color: "red",
        marginBottom: "16px",
    },
    noteList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    noteCard: {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px",
        backgroundColor: "#fafafa",
    },
    buttonGroup: {
        display: "flex",
        gap: "10px",
        marginTop: "12px",
    },
    editButton: {
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer",
    },
    deleteButton: {
        backgroundColor: "#dc2626",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer",
    },
};

export default App;