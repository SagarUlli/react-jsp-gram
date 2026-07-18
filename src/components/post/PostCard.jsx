function PostCard({ post }) {
  return (
    <div className="card mb-4 shadow-sm">
      <img src={post.imageUrl} alt="Post" className="card-img-top" />

      <div className="card-body">
        <h5>{post.user.username}</h5>

        <p>{post.caption}</p>

        <p>❤️ {post.likeCount}</p>

        <p>💬 {post.commentCount}</p>
      </div>
    </div>
  );
}

export default PostCard;
