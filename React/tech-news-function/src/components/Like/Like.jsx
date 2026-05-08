import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { usePostReaction } from "../../hooks/usePostReaction";
import classes from "./Like.module.css";

function Like({ postId }) {
  const { isLiked, setLike } = usePostReaction(postId);

  const handleLike = useCallback(() => {
    setLike();
    if (!isLiked) {
      toast.success("👍 You liked this post!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      toast.info("👍 Like removed", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  }, [isLiked, setLike]);

  const buttonLabel = useMemo(
    () => `👍 ${isLiked ? "Liked" : "Like"}`,
    [isLiked],
  );

  return (
    <button
      className={`${classes["like-btn"]} ${isLiked ? classes["active"] : ""}`}
      onClick={handleLike}
    >
      {buttonLabel}
    </button>
  );
}

export default Like;
