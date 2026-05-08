import { useContext } from "react";
import { PostReactionContext } from "../context/PostReactionContext";

export function usePostReaction(postId) {
  const contextValue = useContext(PostReactionContext);

  if (!contextValue) {
    throw new Error(
      "usePostReaction must be used within a PostReactionProvider",
    );
  }

  const { reactions, setReaction, getReaction } = contextValue;
  const reaction = getReaction(postId);

  const setLike = () => {
    const currentReaction = reaction;
    if (currentReaction === "like") {
      setReaction(postId, null);
    } else {
      setReaction(postId, "like");
    }
  };

  const setDislike = () => {
    const currentReaction = reaction;
    if (currentReaction === "dislike") {
      setReaction(postId, null);
    } else {
      setReaction(postId, "dislike");
    }
  };

  return {
    reaction,
    setLike,
    setDislike,
    isLiked: reaction === "like",
    isDisliked: reaction === "dislike",
  };
}
