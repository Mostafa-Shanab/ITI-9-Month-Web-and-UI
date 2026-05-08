import {
  BrowserRouter as Router,
  useRoutes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { PostReactionProvider } from "./context/PostReactionContext";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ArticleDetail from "./pages/ArticleDetail/ArticleDetail";
import PostsPage from "./pages/Posts/PostsPage";
import AddPost from "./pages/AddPost/AddPost";
import "./App.css";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "posts", element: <PostsPage /> },
      { path: "add-post", element: <AddPost /> },
      { path: "article/:id", element: <ArticleDetail /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "*", element: <Navigate to="/" replace /> },
];

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <PostReactionProvider>
          <div className="app-shell">
            <Header />
            <div className="content-wrapper">
              <AppRoutes />
            </div>
            <Footer />
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
            />
          </div>
        </PostReactionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
