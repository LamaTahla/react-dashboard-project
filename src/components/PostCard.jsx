function PostCard({ post, getAuthorName }) {
  const imageUrl =
    post.imageUrl || `https://picsum.photos/seed/post-${post.id}/600/300`;

  const authorName = getAuthorName
    ? getAuthorName(post.userId)
    : `User ${post.userId}`;

  return (
    <article className="post-card">
      <div className="post-card-image">
        <img src={imageUrl} alt={post.title || 'Post image'} />
      </div>

      <div className="post-card-body">
        <span className="post-card-meta">
          By {authorName}
        </span>

        <h3>{post.title}</h3>

        <p>{post.body?.slice(0, 120)}...</p>

        <span className="post-card-read-more">
          Read more
        </span>
      </div>
    </article>
  );
}

export default PostCard;