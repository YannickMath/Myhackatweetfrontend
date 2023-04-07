import styles from "../styles/tweetComment.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { RiQuestionAnswerFill } from "react-icons/ri";
import Answer from "./Answer";
import CommentAnswer from "./CommentAnswer";

export default function TweetComment(props) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const userRed = useSelector((state) => state.user.value);
  const [count, setCount] = useState(0);
  // const [count2, setCount2] = useState(0);
  const { tweetId, isLightMode, modal, setModal,  handleCloseComment } = props;
  const [answerModal, setAnswerModal] = useState(false);
  const [commentId, setCommentId] = useState("");
  // const [newAnswer, setNewAnswer] = useState("");
  // const [inputVisible, setInputVisible] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  console.log("isSmallScreen value in parent:", isSmallScreen);

  const updateScreenSize = () => {
    const mediaQuery = window.matchMedia(
      "(max-width: 768px) and (orientation: portrait)"
    );
    setIsSmallScreen(mediaQuery.matches);
  };

  useEffect(() => {
    updateScreenSize(); // Call the function once to set the initial value
    window.addEventListener("resize", updateScreenSize); // Listen for window resize events

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  useEffect(() => {
    if (tweetId) {
      fetchComment();
    }
    return;
  }, [tweetId]);

  const fetchComment = async () => {
    if (tweetId === null) {
      return;
    }
    try {
      const response = await fetch(
        `https://myhackatweetbackend.vercel.app/tweets/comments/${tweetId}`
      );
      const data = await response.json();
      if (data.result) {
        setComments(data.tweetsWithComments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    let count = 0;
    setNewComment(e.target.value.slice(0, 279));
    setCount(e.target.value.length);
  };

  // const handleChange2 = (e) => {
  //   let count = 0;
  //   setNewAnswer(e.target.value.slice(0, 279));
  //   setCount2(e.target.value.length);
  // };

  const handleClose = () => {
    handleCloseComment();
  };
  const handleTweetComment = async () => {
    if (newComment.length < 1) {
      return;
    }
    try {
      const response = await fetch(
        `https://myhackatweetbackend.vercel.app/tweets/tweetComment/${tweetId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: newComment,
            username: userRed.username,
          }),
        }
      );
      const data = await response.json();
      if (data.result) {
        setNewComment("");
        fetchComment();
        setCount(0);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseAnswer = () => {
    setAnswerModal(false);
  };

  // const handleInputVisible = () => {
  //   setInputVisible(true);
  // };
const handleAnswerModal = () => {
  setAnswerModal(true)
}
// console.log("issmallscreentweetComment", isSmallScreen)
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            // margin: "10px",
          }}
          onClick={handleClose}
        >
          X Close
        </p>
        <div className={styles.barComment}>
          <textarea
            type="text"
            placeholder="Message..."
            onChange={handleChange}
            value={newComment}
            // className={styles.texteareaComment}
            style={{
              resize: "none",
              width: isSmallScreen ? "50vw" : "32vw",
              borderRadius: "10px",
              height: "8vh",
              maxWidth: "50vw",
            }}
          />
          <button className={styles.BtnComment} onClick={handleTweetComment}>
            Send
          </button>
          <p style={{ fontSize: "0.7rem" }}>{count}/280</p>
        </div>
      </div>
      <div
        className={styles.mapComment}
        style={{ color: "#ffffff", width: "30vw" }}
      >
        {comments.length > 0 &&
          comments.map((comment, i) => {
            const handleClickAnswer = () => {
              setCommentId(comment._id);
            };

            const date = moment(comment.createdAt);
            const formattedDate = date.format("DD/MM/YYYY à HH:mm:ss");
            return (
              <div key={i} className={styles.comment}>
                <div style={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", width: isSmallScreen && "90vw", alignItems: isSmallScreen && "flex-start" }}>
                  <p style={{ marginRight: "15px", color: "gold",  maxHeight: isSmallScreen && "0vh" }}>
                    @{comment.username}
                  </p>
                  <p className={styles.tweetCommentMsg}
                    style={{
                      display: "flex",
                      maxHeight: isSmallScreen ? "18vh" : "30vh",
                      maxWidth: isSmallScreen ? "85vw" : "35vw",
                      padding: isSmallScreen && "5px",
                      flexDirection: "column",
                      wordWrap: "break-word",
                      alignContent: "center",
                      fontSize: isSmallScreen && "12px"
                    }}
                  >
                    {comment.comment}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "10vw",
                  }}
                >
                  <p style={{ fontSize: "8px" }}>{formattedDate}</p>
                  <RiQuestionAnswerFill
                    onClick={handleAnswerModal}
                    style={{ cursor: "pointer" }}
                  />
                  <p style={{ fontSize: "60%", marginLeft: "5%" }}>
                    {comment.answers ? comment.answers.length : "0"}
                  </p>
                </div>

                <CommentAnswer
                  commentId={commentId}
                  setCommentId={setCommentId}
                  fetchComment={fetchComment}
                  useEffect={useEffect}
                  handleClickAnswer={handleClickAnswer}
                />
                {answerModal && comment._id === commentId && (
                  <div>
                    <Answer commentId={commentId} />
                    {/* {console.log("newAnswer", newAnswer)} */}
                    <button
                      onClick={handleCloseAnswer}
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
