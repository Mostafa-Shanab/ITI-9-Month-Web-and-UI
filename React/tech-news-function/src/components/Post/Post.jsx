import { useMemo } from "react";
import Like from "../Like/Like";
import Dislike from "../Dislike/Dislike";
import "./Post.css";

function Post({ title, desc, image, tags }) {
  const postMarkup = useMemo(
    () => (
      <div className="tech-card">
        {image && <img src={image} alt={title} className="post-image" />}
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
          <Like />
          <Dislike />
        </div>
      </div>
    ),
    [title, desc, image, tags],
  );

  return postMarkup;
}

export default Post;
