import styles from "../styles/Welcome.module.css";
import { BsFillTrashFill } from "react-icons/bs";
import { FaHeart, FaHeartBroken, FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";
import TweetComment from '../components/TweetComment'

export default function Tweet(props) {
  const [modal, setModal] = useState (false)


  const userRed = useSelector((state) => state.user.value);

  const {
    handleDeleteTweet,
    handleDislikeTweet,
    handleLikeTweet,
    clickHashtag,
    clickNameHash,
    isLightMode,
  } = props;

  const handleCommentTweet =() => {
    setModal(true)
  }
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
          style={{ color: isLightMode ? "black" : "white" }}
        >
          <div>
            <div
              className={styles.topPartTweet}
              style={{ borderColor: isLightMode ? "black" : "gray" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "10px",
                  height: "40px",
                }}
              >
                <img
                  className={styles.eggPicture2}
                  src="tweet.jpg"
                  alt="egg tweeter"
                />
                <p
                  style={{
                    fontSize: "25px",
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
                marginLeft: "15px",
                display: "flex",
                height: "75px",
                flexWrap: "wrap",
                wordWrap: "break-word",
                alignItems: "center",
              }}
            >
              <p style={{ width: "720px" }}>
                {props.tweet.tweet.tweet.split(" ").map((word, index) => {
                  const color = word.startsWith("#")
                    ? "blue"
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
          <div style={{ margin: "15px" }}>
            <FaHeart
              onClick={() =>
                handleLikeTweet(props.tweet.token, props.tweet.tweet._id)
              }
              size={15}
              style={{
                color:
                  props.tweet.tweet.like.likeCount > 0
                    ? "#DBEEB6"
                    : props.tweet.tweet.like.likeCount === 0 && !isLightMode
                    ? "white"
                    : props.tweet.tweet.like.likeCount === 0
                    ? "black"
                    : "black",
                cursor: "pointer",
                width: "30px",
              }}
            />
            <FaHeartBroken
              onClick={() =>
                handleDislikeTweet(props.tweet.token, props.tweet.tweet._id)
              }
              size={15}
              style={{
                width: "30px",
                color: "white",
                cursor: "pointer",
                color:
                  props.tweet.tweet.dislike.dislikeCount > 0
                    ? "#F08C9E"
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
                }}
              />
            )}
            <FaComments
              style={{
                color: isLightMode ? "black" : "white",
                width: "100px",
                cursor: "pointer"
              }}
              onClick={handleCommentTweet}
            />{modal && <TweetComment setModal={setModal}/>}
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
