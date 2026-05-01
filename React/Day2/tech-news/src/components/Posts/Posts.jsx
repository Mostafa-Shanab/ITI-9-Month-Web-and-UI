import { Component } from "react";
import Post from "../Post/Post";

class Posts extends Component {
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
      .then((data) => {
        const allPosts = [...this.props.initialPosts, ...data];
        this.setState({ posts: allPosts, loading: false });
      })
      .catch((err) => this.setState({ error: err.message, loading: false }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialPosts !== this.props.initialPosts) {
      this.setState({
        posts: [...this.props.initialPosts, ...this.state.posts],
      });
    }
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

export default Posts;
