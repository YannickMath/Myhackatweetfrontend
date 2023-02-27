import styles from "../styles/tweetComment.module.css";
import { useState } from "react";

export default function tweetComment(props) {
  const [newComment, setNewComment] = useState([]);
  const [count, setCount] = useState(0);

  // Handle input change
  const handleChange = (e) => {
    setNewTweet(e.target.value.slice(0, 279));
    setCount(e.target.value.length);
  };

  const setModal = props.setModal;

  const handleCloseComment = () => {
    setModal(false);
  };
  return (
    <div className={styles.main}>
      Be respectfull and kind ! We are all together !
      <p style={{ cursor: "pointer" }} onClick={handleCloseComment}>
        x
      </p>
      <div className={styles.commentTweet}>
        <input
          type="placeholder"
          placeholder="Message..."
          className={styles.inputComment}
          onChange={handleChange}
          value={newComment}
        />
        <button className={styles.BtnComment}>Send message</button>
      </div>
    </div>
  );
}
