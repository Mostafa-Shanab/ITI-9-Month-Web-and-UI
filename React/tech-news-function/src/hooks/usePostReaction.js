import { useSelector, useDispatch } from "react-redux";
import { setReaction } from "../store/slices/reactionsSlice";

export function usePostReaction(postId) {
  const dispatch = useDispatch();
  const reactions = useSelector((state) => state.reactions.reactions);

  const reaction = reactions[postId] || null;

  const setLike = () => {
    const currentReaction = reaction;
    if (currentReaction === "like") {
      dispatch(setReaction({ postId, reaction: null }));
    } else {
      dispatch(setReaction({ postId, reaction: "like" }));
    }
  };

  const setDislike = () => {
    const currentReaction = reaction;
    if (currentReaction === "dislike") {
      dispatch(setReaction({ postId, reaction: null }));
    } else {
      dispatch(setReaction({ postId, reaction: "dislike" }));
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
