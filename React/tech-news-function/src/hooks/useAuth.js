import { useSelector } from "react-redux";

export function useAuth() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    loading,
  };
}
