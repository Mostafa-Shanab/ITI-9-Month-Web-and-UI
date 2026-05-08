import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Posts from "../../components/Posts/Posts";
import "./PostsPage.css";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Unable to load posts.");
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <main className="posts-page">
      <div className="page-container">
        <section className="posts-header">
          <h1>All Posts</h1>
          <p>Browse all published articles.</p>
        </section>
        {loading && <p>Loading posts...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p>No posts available yet.</p>
        )}
        {!loading && !error && posts.length > 0 && (
          <div className="post-grid">
            <Posts posts={posts} />
          </div>
        )}
      </div>
    </main>
  );
}

export default PostsPage;
