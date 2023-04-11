import styles from "../styles/Welcome.module.css";
import { BsFillTrashFill } from "react-icons/bs";
import {
  FaThumbsDown,
  FaThumbsUp,
  FaHeart,
  FaHeartBroken,
  FaComments,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";
import TweetComment from "../components/TweetComment";
import { useRef } from "react";
import { useEffect } from "react";
// import '../styles/fonts.css';

export default function Tweet(props) {
  const [modal, setModal] = useState(false);
  const [tweetId, setTweetId] = useState("");
  const userRed = useSelector((state) => state.user.value);

  // const { tweet, modal, setModal, handleCloseComment } = props;
  // console.log("tweetId", tweetId)
  const {
    handleDeleteTweet,
    handleDislikeTweet,
    handleLikeTweet,
    clickHashtag,
    clickNameHash,
    isLightMode,
    isSmallScreen,
    // modal,
    // setModal,
    // handleCloseComment
  } = props;

  // console.log("MODAL", modal)
  // console.log("TWEETID", tweetId)
  const handleCommentTweet = (id) => {
    if (modal) {
      console.log("Une modal de commentaire est déjà ouverte.");
    } else {
      setTweetId(props.tweet.tweet._id);
      // console.log("PROPS.TWEET.TWEET._ID", props.tweet.tweet._id)
      setModal(true);
    }
  };

  const handleCloseComment = () => {
    setModal(false);
  };

  // console.log("SETMODAL", typeof Modal);

  // console.log("RRRR", tweetId);
  const date = moment(props.tweet.tweet.createdAt);
  const formattedDate = date.format("DD/MM/YYYY à HH:mm:ss");
  // console.log("props.tweet.tweet.tweet", props.tweet.tweet._id);
  const isTweetVisible = () => {
    if (clickHashtag && !props.tweet.tweet.tweet.includes(clickNameHash)) {
      return false;
    }
    return true;
  };



  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = "auto";
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
    }
  }, [props.tweet.tweet.tweet]);
  return (
    <>
      {isTweetVisible() && (
        <div
          className={styles.tweetContainer}
          style={{
            backgroundColor: isLightMode ? "#DCD8F3" : "black",
            color: isLightMode ? "black" : "white",
          }}
        >
          <div>
            <div
              className={styles.topPartTweet}
              style={{
                borderColor: isLightMode ? "black" : "gray",
                height: "12vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  fontSize: "10px",
                  height: "100%",
                }}
              >
                <img
                  className={styles.userPicture}
                  style={{ marginTop: isSmallScreen && "4px" }}
                  src={
                    props.tweet.photo
                      ? props.tweet.photo
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgPRYXismg465UTJJNto7XrUEggRKG789Arom_elDmxA&s"
                  }
                  alt="user picture"
                />
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginLeft: "5px",
                    marginTop: isSmallScreen && "20px",
                  }}
                >
                  {props.tweet.firstname}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    marginLeft: "5px",
                  }}
                >
                  @{props.tweet.username}
                </p>
              </div>
            </div>
            <div
      ref={containerRef}
      style={{
        marginLeft: "5px",
        display: "flex",
        maxHeight: isSmallScreen ? "58vh" : "21vh",
        padding: isSmallScreen && "2px",
        width: "100%",
        height: isSmallScreen && "2vh",
        flexWrap: "wrap",
        wordWrap: "break-word",
        alignContent: "center",
        lineHeight: isSmallScreen ? "1.2" : "1",
        marginTop: "-35px",
        marginBottom: "-20px",
      }}
    >
              <p style={{ width: "98%" }}>
                {props.tweet.tweet.tweet.split(" ").map((word, index) => {
                  const color = word.startsWith("#")
                    ? "#006AF9"
                    : isLightMode
                    ? "black"
                    : "white";
                  return (
                    <span
                      key={index}
                      style={{
                        color,
                        fontSize: isSmallScreen ? "14px" : "15px",
                      }}
                    >
                      {word}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
          <div
            style={{
              margin: "15px",
              marginBottom: isSmallScreen ? "10px" : "20px",
              height: "6.2vh",
            }}
          >
            <FaThumbsUp
              onClick={() =>
                handleLikeTweet(props.tweet.token, props.tweet.tweet._id)
              }
              size={17}
              style={{
                color:
                  props.tweet.tweet.like.likeCount > 0
                    ? "#037821"
                    : props.tweet.tweet.like.likeCount === 0 && !isLightMode
                    ? "white"
                    : props.tweet.tweet.like.likeCount === 0
                    ? "black"
                    : "black",
                cursor: "pointer",
                marginLeft: "7px",
              }}
            />
            <FaThumbsDown
              onClick={() =>
                handleDislikeTweet(props.tweet.token, props.tweet.tweet._id)
              }
              size={17}
              style={{
                // width: "30px",
                marginLeft: "12px",
                color: "white",
                cursor: "pointer",
                color:
                  props.tweet.tweet.dislike.dislikeCount > 0
                    ? "#D00511"
                    : props.tweet.tweet.dislike.dislikeCount === 0 &&
                      !isLightMode
                    ? "white"
                    : props.tweet.tweet.dislike.dislikeCount === 0
                    ? "black"
                    : "black",
              }}
            />
            {props.tweet.token === userRed.token && (
              <BsFillTrashFill
                onClick={() =>
                  handleDeleteTweet(props.tweet.token, props.tweet.tweet._id)
                }
                size={16}
                style={{
                  cursor: "pointer",
                  marginLeft: "20px",
                  marginTop: "5px",
                  marginRight: "15px",
                  color: isLightMode ? "black" : "white",
                }}
              />
            )}
            <FaComments
              style={{
                color: isLightMode ? "black" : "white",
                cursor: "pointer",
                margin: "0",
                fontSize: "18px",
                marginLeft: BsFillTrashFill && isSmallScreen ? "10px" : "18px",
              }}
              onClick={handleCommentTweet}
            />
            {modal && (
              <TweetComment
                tweet={props.tweet}
                formattedDate={formattedDate}
                modal={modal}
                setModal={setModal}
                tweetId={tweetId}
                isLightMode={props.isLightMode}
                handleCloseComment={handleCloseComment}
                isSmallScreen={isSmallScreen}
              />
            )}
            <div style={{ display: "flex" }}>
              <p
                className={styles.like}
                style={{
                  color: isLightMode ? "black" : "white",
                  width: "25px",
                  fontSize: "12px",
                }}
              >
                {props.tweet.tweet.like.likeCount}
              </p>
              <p
                className={styles.dislike}
                style={{
                  color: isLightMode ? "black" : "white",
                  width: "25px",
                  fontSize: "12px",
                }}
              >
                {props.tweet.tweet.dislike.dislikeCount}
              </p>
              <p
                // className={styles.dislike}
                style={{
                  // color: isLightMode ? "black" : "white",
                  width: "25px",
                  fontSize: "12px",
                  marginLeft:
                    props.tweet.token === userRed.token
                      ? isSmallScreen
                        ? "17%"
                        : "8%"
                      : "1%",
                }}
              >
                {props.tweet.tweet.comments.length}
              </p>
              <p
                className={styles.tweetDate}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  fontSize: "12px",
                  color: isLightMode ? "black" : "white",
                  width: "200px",
                }}
              >
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
