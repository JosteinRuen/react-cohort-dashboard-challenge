import { useState, useContext } from "react";
import { AppContext } from "../App";
import "./Styling/NewCommentForm.css";

function NewCommentForm({ postId }) {
  const { user, setPosts } = useContext(AppContext);
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;

    const newComment = {
      content,
      contactId: user.id,
      postId,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`https://boolean-uk-api-server.fly.dev/josteinruen/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const createdComment = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, comments: [createdComment, ...post.comments] }
              : post
          )
        );
        setContent("");
      } else {
        console.error('Error creating comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <form className="new-comment-form" onSubmit={handleSubmit}>
      <div>
        <label>Comment</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default NewCommentForm;