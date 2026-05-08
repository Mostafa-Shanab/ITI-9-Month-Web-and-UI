import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Like from "../../components/Like/Like";
import Dislike from "../../components/Dislike/Dislike";
import { resolveImageUrl } from "../../utils/resolveImagePath";
import "./ArticleDetail.css";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        toast.error("Failed to load article");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="article-loading">
        <p>Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="article-not-found">
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  const resolvedImage = resolveImageUrl(post.image);

  // Placeholder image for articles without images
  const placeholderImage =
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f9fafb"/>
      <rect x="40" y="40" width="720" height="320" fill="#f3f4f6" rx="12"/>
      <circle cx="400" cy="140" r="40" fill="#9ca3af"/>
      <rect x="320" y="200" width="160" height="12" fill="#9ca3af" rx="6"/>
      <rect x="340" y="230" width="120" height="8" fill="#d1d5db" rx="4"/>
      <rect x="360" y="250" width="80" height="8" fill="#d1d5db" rx="4"/>
      <text x="400" y="320" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="18">No Image Available</text>
    </svg>
  `);

  return (
    <div className="article-page">
      <div className="article-container">
        <button onClick={() => navigate("/posts")} className="back-btn">
          ← Back to Posts
        </button>

        <article className="article-detail">
          <div className="article-image-container">
            <img
              src={resolvedImage || placeholderImage}
              alt={post.title}
              className="article-image"
            />
          </div>

          <div className="article-content">
            <h1 className="article-title">{post.title}</h1>

            {post.tags && post.tags.length > 0 && (
              <div className="article-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="article-body">
              <p className="article-description">{post.desc}</p>
            </div>

            <div className="article-actions">
              <Like postId={post.id} />
              <Dislike postId={post.id} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default ArticleDetail;
