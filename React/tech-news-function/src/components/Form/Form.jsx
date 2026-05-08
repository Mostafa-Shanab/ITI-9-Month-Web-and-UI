import { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./Form.css";

function Form({ onPostAdded, onSuccess }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "desc") setDesc(value);
    else if (name === "image") setImage(value);
    else if (name === "tags") setTags(value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!title.trim() || !desc.trim()) {
        setError("Please fill all fields");
        toast.error("Please fill in all required fields!");
        return;
      }

      setLoading(true);
      setError(null);

      const newPost = {
        id: uuidv4(),
        title,
        desc,
        image,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });

        if (!response.ok) {
          throw new Error("Failed to add post");
        }

        if (onPostAdded) {
          onPostAdded(newPost);
        }
        toast.success("✨ Post created successfully!");
        setTitle("");
        setDesc("");
        setImage("");
        setTags("");
        setLoading(false);
        setError(null);

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
        toast.error("Failed to create post!");
        console.error("Error:", error);
      }
    },
    [title, desc, image, tags, onPostAdded, onSuccess],
  );

  const isSubmitDisabled = useMemo(() => loading, [loading]);
  const buttonLabel = useMemo(
    () => (loading ? "Submitting..." : "Submit"),
    [loading],
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Description"
          name="desc"
          value={desc}
          onChange={handleChange}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Image URL"
          name="image"
          value={image}
          onChange={handleChange}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Tags (comma separated)"
          name="tags"
          value={tags}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitDisabled}
        >
          {buttonLabel}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}

export default Form;
