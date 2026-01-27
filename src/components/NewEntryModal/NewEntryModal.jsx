import { useEffect, useState } from "react"
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./NewEntryModal.css";

function NewEntryModal({ isOpen, onClose, onCreateEntry, isLoading }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [mood, setMood] = useState("neutral");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (!isOpen) return;
        setTitle("");
        setBody("");
        setMood("neutral");
        setTags("");
}, [isOpen]);

const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

    onCreateEntry({
        title, 
        body, 
        mood, 
        tags: tagsArray,
    });
};

return (
    <ModalWithForm isOpen={isOpen} title="New Entry" onClose={onClose} onSubmit={handleSubmit}>
        <label className="auth__label">
            Title
            <input
            className="auth__input"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title"
            minlength="1"
            maxlength="100"
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
            placeholder="Write what's on your heart..."
            minlength="1"
            maxlength="5000"
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
            Tags (Comma Separated)
            <input
            className="auth__input"
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Faith, Gratitude, Progress"
            />
     </label>

     <button className="auth__button" type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Entry"}
     </button>
    </ModalWithForm>
);
}

export default NewEntryModal;