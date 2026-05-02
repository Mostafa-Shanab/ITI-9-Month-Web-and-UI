import { useState, useCallback, useMemo } from "react";
import classes from "./Like.module.css";

function Like() {
  const [likes, setLikes] = useState(0);

  const handleLike = useCallback(() => {
    setLikes((prevLikes) => prevLikes + 1);
  }, []);

  const buttonLabel = useMemo(() => `👍 Like (${likes})`, [likes]);

  return (
    <button className={classes["like-btn"]} onClick={handleLike}>
      {buttonLabel}
    </button>
  );
}

export default Like;
