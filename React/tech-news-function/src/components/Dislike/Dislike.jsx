import { useState, useCallback, useMemo } from "react";
import classes from "./Dislike.module.css";

function Dislike() {
  const [dislikes, setDislikes] = useState(0);

  const handleDislike = useCallback(() => {
    setDislikes((prevDislikes) => prevDislikes + 1);
  }, []);

  const buttonLabel = useMemo(() => `👎 Dislike (${dislikes})`, [dislikes]);

  return (
    <button className={classes["dislike-btn"]} onClick={handleDislike}>
      {buttonLabel}
    </button>
  );
}

export default Dislike;
