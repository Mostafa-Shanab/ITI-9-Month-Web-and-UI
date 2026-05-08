import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import "./AddPost.css";

function AddPost() {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    navigate("/posts");
  }, [navigate]);

  return (
    <main className="add-post-page">
      <div className="page-container">
        <section className="add-post-header">
          <h1>Add a New Post</h1>
          <p>Fill out the form below to create a new article.</p>
        </section>
        <div className="form-wrapper">
          <Form onSuccess={handleSuccess} />
        </div>
      </div>
    </main>
  );
}

export default AddPost;
