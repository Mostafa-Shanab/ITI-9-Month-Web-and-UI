import { Component } from "react";
import Post from "../Post/Post";

class Posts extends Component {
  // render() {
  //   return (
  //     <>
  //       <Post></Post>
  //       <Post></Post>
  //       <Post></Post>
  //     </>
  //   );
  // }

  state = {
    posts: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    fetch("http://localhost:3000/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => this.setState({ posts: data, loading: false }))
      .catch((err) => this.setState({ error: err.message, loading: false }));
  }

  render() {
    const { posts, loading, error } = this.state;

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <>
        {posts.map((post) => (
          <Post key={post.id} title={post.title} desc={post.desc} />
        ))}
      </>
    );
  }
}

// function Posts() {
//   return (
//     <>
//       <Post></Post>
//       <Post></Post>
//       <Post></Post>
//     </>
//   );
// }

export default Posts;
