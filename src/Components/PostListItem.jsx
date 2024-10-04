import { useContext } from "react";
import { AppContext } from "../App";
import CommentList from "./CommentList";
import "./Styling/PostListItem.css";

function getInitials(firstName, lastName) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

function PostListItem({ post }) {
  const { friendList } = useContext(AppContext);

  if (!friendList) {
    return null;
  }

  const postAuthor = friendList.find(friend => friend.id === post.contactId);
  const initials = postAuthor ? getInitials(postAuthor.firstName, postAuthor.lastName) : "NA";
  const authorName = postAuthor ? `${postAuthor.firstName} ${postAuthor.lastName}` : "Unknown";

  return (
    <div className="post-list-item">
      <div className="post-author">
        <div className="post-author-initials" style={{ backgroundColor: postAuthor?.favouriteColour || "#64648c" }}>
          {initials}
        </div>
        <span className="post-author-name">{authorName}</span>
      </div>
      <div className="post-content">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
      <CommentList postId={post.id} />
    </div>
  );
}

export default PostListItem;