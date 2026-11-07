import "./style/post-card.css";

export default function PostCard({ post }) {
    return (
        <div className="post-item">
            <div className="post-content">
                <span className="post-header">
                    Guest User
                </span>

                <small className="post-timestamp">
                    {post.created_at
                        ? new Date(post.created_at).toLocaleString()
                        : "Just now"}
                </small>
            </div>

            <p className="post-message">{post.message}</p>
        </div>
    );
}
