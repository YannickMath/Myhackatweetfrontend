import { useState } from "react";
import { useSelector } from "react-redux";

export default function CommentAnswer(props) {
  const [newAnswer, setNewAnswer] = useState("");
  const [count, setCount] = useState(0);
  const [commentId, setCommentId] = useState("");
  const { comments, isSmallScreen, fetchComment } = props;
  const userRed = useSelector((state) => state.user.value);

  console.log("COMMENTS", comments);

  const handleChange = (e) => {
    setNewAnswer(e.target.value.slice(0, 279));
    setCount(e.target.value.length);
  };

  const handleClick = (commentId) => {
    setCommentId(commentId);
  };
  const handleSubmit = async () => {
    console.log("NEWANSWER", newAnswer);
    console.log("commentId", commentId);
    if (!commentId) return;
    try {
      const response = await fetch(
        `https://myhackatweetbackend.vercel.app/tweets/commentAnswer/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer: newAnswer,
            username: userRed.username,
          }),
        }
      );
      const data = await response.json();
      if (data.result) {
        setNewAnswer("");
        fetchComment();
        setCount(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: isSmallScreen ? "80vw" : "135%",
        justifyContent: "space-between",
      }}
    >
      <input
        type="text"
        placeholder="Reply..."
        onChange={handleChange}
        value={newAnswer}
        style={{
          resize: "none",
          width: isSmallScreen ? "80vw" : "32vw",
          borderRadius: "10px",
          height: "3vh",
          maxWidth: isSmallScreen ? "100vw" : "50vw",
          //   marginBottom: "10px",
        }}
      />
      <button
        style={{
          width: isSmallScreen ? "15vw" : "12%",
          cursor: "pointer",
          marginLeft: isSmallScreen && "15px",
        }}
        onClick={() => {
          handleAnswerModal();
          handleClick(comment._id);
        }}
      >
        Reply
      </button>
      <p style={{ fontSize: "60%", marginLeft: isSmallScreen && "10px" }}>
        {count}/280
      </p>
    </div>
  );
}
