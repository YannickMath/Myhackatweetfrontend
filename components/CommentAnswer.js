import { useState } from "react";

export default function CommentAnswer(props) {
  const [newAnswer, setNewAnswer] = useState("");
  const [count, setCount] = useState(0);

  const { commentId, setCommentId, fetchComment, handleClickAnswer } = props;
 

  
  const handleChange = (e) => {
      setNewAnswer(e.target.value.slice(0, 279));
      setCount(e.target.value.length);
    };
    
    const handleSubmit = async () => {
      // console.log("NEWANSWER", newAnswer);
      // console.log("commentId", commentId);
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
            username: props.username,
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
        width: "135%",
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
          width: "32vw",
          borderRadius: "10px",
          height: "3vh",
          maxWidth: "50vw",
          //   marginBottom: "10px",
        }}
      />
      <button style={{ width: "12%" , cursor: "pointer"}} onClick={handleSubmit}>
        Reply
      </button>
      <p style={{ fontSize: "55%" }}>{count}/280</p>
    </div>
  );
}
