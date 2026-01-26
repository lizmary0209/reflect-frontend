import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditEntryModal.css";

function EditEntryModal({ isOpen, onClose, onUpdateEntry, isLoading, entry }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [mood, setMood] = useState("neutral");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (!isOpen || !entry) return;

        setTitle(entry.title || "");
        setBody(entry.body || "");
        setMood(entry.mood || "neutral");
        setTags(Array.isArray(entry.tags) ? entry.tags.join(", ") : "");
    }, [isOpen, entry]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

        onUpdateEntry(entry._id, {
            title, 
            body, 
            mood, 
            tags: tagsArray,
        });
    };

    return (
        <ModalWithForm isOpen={isOpen} title="Edit Entry" onClose={onClose} onSubmit={handleSubmit}>
            <label className="auth__label">
                Title
                <input className="auth__input"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Update title"
                minLength="1"
                maxLength="100"
                required
                />
            </label>

            <label className="auth__label">
                Entry
                <textarea
                className="auth__input"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Update your entry..."
                minLength="1"
                maxLength="5000"
                required
                />
            </label>

            <label className="auth__label">
                Mood
                <select className="auth__input" name="mood" value={mood} onChange={(e) => setMood(e.target.value)}>
                    <option value="calm">calm</option>
                    <option value="grateful">grateful</option>
                    <option value="anxious">anxious</option>
                    <option value="joyful">joyful</option>
                    <option value="sad">sad</option>
                    <option value="angry">angry</option>
                    <option value="neutral">neutral</option>
                </select>
            </label>

            <label className="auth__label">
                Tags (comma separated)
                <input 
                className="auth__input"
                type="text"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="faith, gratitude, progress"
                />
            </label>

            <button className="auth_button" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
            </button>
</ModalWithForm>
    );
}

export default EditEntryModal;