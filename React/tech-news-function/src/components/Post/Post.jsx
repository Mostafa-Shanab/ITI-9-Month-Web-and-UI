import { useNavigate } from "react-router-dom";
import Like from "../Like/Like";
import Dislike from "../Dislike/Dislike";
import { resolveImageUrl } from "../../utils/resolveImagePath";
import "./Post.css";

function Post({ id, title, desc, image, tags }) {
  const navigate = useNavigate();
  const resolvedImage = resolveImageUrl(image);

  // Placeholder image for posts without images
  const placeholderImage =
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect x="20" y="20" width="360" height="210" fill="#e5e7eb" rx="8"/>
      <circle cx="200" cy="80" r="25" fill="#9ca3af"/>
      <rect x="160" y="120" width="80" height="8" fill="#9ca3af" rx="4"/>
      <rect x="170" y="140" width="60" height="6" fill="#d1d5db" rx="3"/>
      <rect x="180" y="160" width="40" height="6" fill="#d1d5db" rx="3"/>
      <text x="200" y="200" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="14">No Image Available</text>
    </svg>
  `);

  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons
    if (e.target.closest("button")) {
      return;
    }
    navigate(`/article/${id}`);
  };

  return (
    <div
      className="tech-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={resolvedImage || placeholderImage}
        alt={title}
        className="post-image"
      />
      <h3 className="tech-card-title">{title}</h3>
      <p className="tech-card-desc">{desc}</p>
      {tags && tags.length > 0 && (
        <div className="post-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="post-actions">
        <Like postId={id} />
        <Dislike postId={id} />
      </div>
    </div>
  );
}

export default Post;
