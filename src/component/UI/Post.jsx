
import React, { useState, useEffect } from "react";
import { getPosts, storePost } from "../../api/post";
import "./style/post.css";
import PostCard from "./PostCard";

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                const data = response.data.data || response.data;
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to load posts:", error);
                setError("Unable to load posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError("Post cannot be empty");
            return;
        }

        setProcessing(true);
        setError("");

        try {
            const response = await storePost({
                message: message.trim()
            });

            const newPost = response.data.data || response.data;

            setPosts((previousPosts) => [
                newPost,
                ...previousPosts
            ]);

            setMessage("");
        } catch (error) {
            console.error("Failed to submit post:", error);

            const errMsg =
                error.response?.data?.message ||
                "Failed to store post. Please try again.";

            setError(errMsg);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="post-page">
            <form className="post-form" onSubmit={submit}>
                <textarea
                    className="post-input"
                    placeholder="What is happening?!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {error && (
                    <p className="post-error">{error}</p>
                )}

                <button
                    type="submit"
                    className="post-button"
                    disabled={processing}
                >
                    {processing ? "Posting..." : "Post"}
                </button>
            </form>

            <div className="post-feed">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
