
export default function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
