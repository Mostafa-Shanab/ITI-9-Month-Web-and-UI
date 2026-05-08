import { createContext, useState, useEffect, useCallback } from "react";

export const PostReactionContext = createContext();

export function PostReactionProvider({ children }) {
  const [reactions, setReactions] = useState({});

  // Load reactions from localStorage on mount
  useEffect(() => {
    function loadReactions() {
      const storedReactions = localStorage.getItem("postReactions");
      if (storedReactions) {
        try {
          setReactions(JSON.parse(storedReactions));
        } catch (error) {
          console.error("Error loading reactions:", error);
        }
      }
    }
    loadReactions();
  }, []);

  // Save reactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("postReactions", JSON.stringify(reactions));
  }, [reactions]);

  const setReaction = useCallback((postId, reaction) => {
    setReactions((prev) => ({
      ...prev,
      [postId]: reaction,
    }));
  }, []);

  const getReaction = useCallback(
    (postId) => {
      return reactions[postId] || null;
    },
    [reactions],
  );

  return (
    <PostReactionContext.Provider
      value={{ reactions, setReaction, getReaction }}
    >
      {children}
    </PostReactionContext.Provider>
  );
}
