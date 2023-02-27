import styles from "../styles/Welcome.module.css";
import { BsFillTrashFill } from "react-icons/bs";
import { FaThumbsDown,FaThumbsUp,FaHeart, FaHeartBroken, FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";
import TweetComment from "../components/TweetComment";
// import '../styles/fonts.css';

export default function Tweet(props) {
  const [modal, setModal] = useState(false);

  const userRed = useSelector((state) => state.user.value);

  const {
    handleDeleteTweet,
    handleDislikeTweet,
    handleLikeTweet,
    clickHashtag,
    clickNameHash,
    isLightMode,
  } = props;

  const handleCommentTweet = () => {
    setModal(true);
  };
  const date = moment(props.tweet.tweet.createdAt);
  const formattedDate = date.format("DD/MM/YYYY à HH:mm:ss");

  const isTweetVisible = () => {
    if (clickHashtag && !props.tweet.tweet.tweet.includes(clickNameHash)) {
      return false;
    }
    return true;
  };

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
                  alignItems: "center",
                  fontSize: "10px",
                  height: "100%",
                }}
              >
                <img
                  className={styles.userPicture}
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
              style={{
                marginLeft: "5px",
                display: "flex",
                maxHeight: "14vh",
                width: "100%",
                flexWrap: "wrap",
                wordWrap: "break-word",
                alignContent: "center",
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
                    <span key={index} style={{ color, fontSize: "19px" }}>
                      {word}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
          <div style={{ margin: "15px", height: "6.2vh" }}>
            <FaThumbsUp
              onClick={
                () =>
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
                marginLeft: BsFillTrashFill && "18px",
              }}
              onClick={handleCommentTweet}
            />
            {modal && <TweetComment setModal={setModal} />}
            <div style={{ display: "flex" }}>
              <p
                className={styles.like}
                style={{
                  color: isLightMode ? "black" : "white",
                  width: "25px",
                  fontSize: "14px",
                }}
              >
                {props.tweet.tweet.like.likeCount}
              </p>
              <p
                className={styles.dislike}
                style={{
                  color: isLightMode ? "black" : "white",
                  width: "25px",
                  fontSize: "14px",
                }}
              >
                {props.tweet.tweet.dislike.dislikeCount}
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
