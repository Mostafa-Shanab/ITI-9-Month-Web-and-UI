import Post from "../Post/Post";

function Posts({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          desc={post.desc}
          image={post.image}
          tags={post.tags}
        />
      ))}
    </>
  );
}

export default Posts;
