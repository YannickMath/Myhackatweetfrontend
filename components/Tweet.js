import styles from "../styles/Welcome.module.css";
import { useState } from "react";
import { ImBin2 } from "react-icons/im";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";

export default function Tweet(props) {
  const hashtagRegex = /#\S+\b/g;

  const userRed = useSelector((state) => state.user.value);

  const {
    handleDeleteTweet,
    handleDislikeTweet,
    handleLikeTweet,
    clickHashtag,
    clickNameHash,
    isLightMode,
  } = props;

  return (
    <div className={styles.tweetContainer}  style={{color: isLightMode ? "black" : "white"}}>
      {props.tweet.tweet.length > 0
        ? props.tweet.tweet.map((Message, j) => {
            const hashtags = Message.tweet.match(hashtagRegex);
            const date = moment(Message.createdAt);
            const formattedDate = date.format("DD/MM/YYYY à HH:mm:ss");

            // On vérifie si clickNameTag est défini et si le tweet ne contient pas cette valeur, on ne l'affiche pas
            if (clickHashtag && !Message.tweet.includes(clickNameHash)) {
              return null;
            }
            return (
              <div
           
              >
                <div className={styles.topPartTweet}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className={styles.eggPicture}
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
                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        justifyContent: "center",
                        fontSize: "18px",
                        marginLeft: "10px",
                        height: "6vh",
                        marginRight: "15px",
                      }}
                    >
                      {!clickHashtag
                        ? Message.tweet
                            .split(" ")
                            .reduce((acc, word, index) => {
                              const color =
                                hashtags && hashtags.indexOf(word) !== -1
                                  ? "blue"
                                  : "white";
                              const element = (
                                <span key={index} style={{ color: color }}>
                                  {word}{" "}
                                </span>
                              );
                              if (index === 0) {
                                return [element];
                              } else {
                                return [...acc, " ", element];
                              }
                            }, [])
                        : Message.tweet
                            .split(" ")
                            .filter((word) =>
                              word
                                .toLowerCase()
                                .includes(clickNameHash.toLowerCase())
                            )
                            .map((word, index) => {
                              const color =
                                hashtags && hashtags.indexOf(word) !== -1
                                  ? "blue"
                                  : "white";
                              return (
                                <span key={index} style={{ color: color }}>
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
                      handleLikeTweet(props.tweet.token, Message._id)
                    }
                    size={20}
                    style={{
                      color: Message.like.likeCount > 0 ? "#DBEEB6" : "white",
                      cursor: "pointer",
                      width: "30px",
                    }}
                  />
                  <FaHeartBroken
                    onClick={() =>
                      handleDislikeTweet(props.tweet.token, Message._id)
                    }
                    size={20}
                    style={{
                      width: "30px",
                      color: "white",
                      cursor: "pointer",
                      color:
                        Message.dislike.dislikeCount > 0 ? "#F08C9E" : "white",
                    }}
                  />
                  {props.tweet.token === userRed.token && (
                    <ImBin2
                      
                      onClick={() =>
                        handleDeleteTweet(props.tweet.token, Message._id)
                      }
                      size={20}
                    />
                  )}
                  <div style={{ display: "flex" }}>
                    <p className={styles.like}>{Message.like.likeCount}</p>
                    <p className={styles.dislike}>
                      {Message.dislike.dislikeCount}
                    </p>
                    <p
                      className={styles.tweetDate}
                    >
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}
