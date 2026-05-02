import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import Slider from "./components/Slider/Slider";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  const handleNewPost = useCallback((newPost) => {
    setPosts((prevState) => [newPost, ...prevState]);
  }, []);

  const filteredPosts = useMemo(() => {
    if (!debouncedSearchTerm) return posts;
    return posts.filter((post) =>
      post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [posts, debouncedSearchTerm]);

  return (
    <>
      <Header></Header>
      <Slider></Slider>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <main className="container">
        <Form onPostAdded={handleNewPost}></Form>
        <div>
          <Posts posts={filteredPosts}></Posts>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
