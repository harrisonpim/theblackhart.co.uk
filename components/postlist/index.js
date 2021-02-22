import Post from "./post";

export default function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div className="pb-4">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
