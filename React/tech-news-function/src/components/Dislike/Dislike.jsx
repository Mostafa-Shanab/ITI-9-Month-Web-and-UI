import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { usePostReaction } from "../../hooks/usePostReaction";
import classes from "./Dislike.module.css";

function Dislike({ postId }) {
  const { isDisliked, setDislike } = usePostReaction(postId);

  const handleDislike = useCallback(() => {
    setDislike();
    if (!isDisliked) {
      toast.error("👎 You disliked this post!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      toast.info("👎 Dislike removed", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  }, [isDisliked, setDislike]);

  const buttonLabel = useMemo(
    () => `👎 ${isDisliked ? "Disliked" : "Dislike"}`,
    [isDisliked],
  );

  return (
    <button
      className={`${classes["dislike-btn"]} ${isDisliked ? classes["active"] : ""}`}
      onClick={handleDislike}
    >
      {buttonLabel}
    </button>
  );
}

export default Dislike;
