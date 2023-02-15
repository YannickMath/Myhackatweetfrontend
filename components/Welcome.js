import styles from "../styles/Welcome.module.css";
import { useRouter } from "next/router";
import { AiOutlineTwitter } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "@/reducers/user.slice";
import { useEffect } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function Welcome() {
  // Router hook
  const router = useRouter();

  // Dispatch hook
  const dispatch = useDispatch();

  // Selectors to access the user and tweet values from the store
  const userRed = useSelector((state) => state.user.value);
  const tweetRed = useSelector((state) => state.tweet.value);

  // State for tweet and count
  const [count, setCount] = useState(0);
  const [newTweet, setNewTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tweets");
      const data = await response.json();
      if (data.result) {
        setTweets(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    if (e.target.value.length > 0 || e.target.value.length <= 280) {
      setNewTweet(e.target.value);
      setCount(e.target.value.length);
    }
  };

  // Handle tweet
  // console.log("TWEETS", tweets);
  const handleTweet = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tweets/tweet/${userRed.token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tweet: newTweet,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to post tweet");
      }

      const data = await response.json();
      if (response.ok) {
        setNewTweet("");
        setCount(0);
        fetchData();
      } else {
        throw new Error("Failed to add tweet to the store");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    router.push("/");
    dispatch(logout());
  };

  const handleDeleteTweet = async (token, tweetId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tweets/deleteTweet/${token}/${tweetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("TOKEN", token);
      console.log("TWEETID", tweetId);

      const data = await response.json();
      if (data.result) {
        fetchData();
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // console.log('TWEET.TOKEN', token)

  const handleLikeTweet = async (token, tweetId) => {
    if (token === userRed.token) {
      alert("You cannot like or dislike your own tweets");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/tweets/likeTweet/${token}/${tweetId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like tweet");
      }

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislikeTweet = async (token, tweetId) => {
    if (token === userRed.token) {
      alert("You cannot like or dislike your own tweets");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/tweets/dislikeTweet/${token}/${tweetId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to dislike tweet");
      }

      const data = await response.json();
      // console.log("userId", userId);
      if (response.ok) {
        fetchData();
      } else {
        throw new Error("Failed to dislike tweet to the store");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tweetView = tweets.map((tweet, i) => {
    return (
      <div key={i} className={styles.tweetContainer}>
        {tweet.tweet.length > 0
          ? tweet.tweet.map((Message, j) => {
              const hashtagRegex = /[^\s]*/g;
              const hashtags = Message.tweet.match(hashtagRegex);
              const hashtagArray = [];

              return (
                <div key={j}>
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
                        {tweet.firstname}
                      </p>
                      <p style={{ fontSize: "18px", marginLeft: "5px" }}>
                        @{tweet.username}
                      </p>
                    </div>
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        fontSize: "18px",
                        marginLeft: "10px",
                        height: "6vh",
                        wordWrap: "break-word",
                        marginRight: "15px",
                      }}
                    >
                      {hashtags
                        ? Message.tweet.split(hashtagRegex).map((part, k) => {
                            {
                              console.log(
                                "ARRAYPUSH",
                                hashtagArray.push(hashtags)
                              );
                              console.log("hashtagArray", hashtagArray);
                              console.log(
                                "MSG.TWEET.SPLIT.#REGEX",
                                Message.tweet.split(hashtagRegex)
                              );
                              console.log("HASHTAG", hashtags);
                              console.log("PART", part);
                            }
                            if (hashtags.includes(part)) {
                              return (
                                <a
                                  key={k}
                                  href={`/hashtag/${part.substring(1)}`}
                                  style={{ color: "yellow" }}
                                >
                                  {console.log("TWEET.TOKEN", tweet.token)}
                                  {part}
                                </a>
                              );
                            } else {
                              return part;
                            }
                          })
                        : Message.tweet}
                    </p>
                  </div>
                  <div style={{ margin: "15px" }}>
                    <AiFillLike
                      onClick={() => handleLikeTweet(tweet.token, Message._id)}
                      size={20}
                      style={{
                        color: Message.like.likeCount > 0 ? "#DBEEB6" : "white",
                        cursor: "pointer",
                        width: "30px",
                      }}
                    />
                    {console.log("BTC", Message.dislike.dislikeCount)}
                    <AiFillDislike
                      onClick={() => handleDislikeTweet(tweet.token, Message._id)}
                      size={20}
                      style={{
                        width: "30px",
                        color: "white",
                        cursor: "pointer",
                        color:
                          Message.dislike.dislikeCount > 0
                            ? "#F08C9E"
                            : "white",
                      }}
                    />
                    {tweet.token === userRed.token && (
                      <RiDeleteBin5Fill
                        onClick={() =>
                          handleDeleteTweet(tweet.token, Message._id)
                        }
                        style={{
                          cursor: "pointer",
                          width: "25px",
                          color: "#ffffff",
                          marginLeft: "10px",
                        }}
                        size={20}
                      />
                    )}
                    <div style={{ display: "flex" }}>
                      <p
                        style={{
                          marginLeft: "5px",
                          width: "25px",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        {Message.like.likeCount}
                      </p>
                      <p
                        style={{
                          marginLeft: "5px",
                          width: "25px",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        {Message.dislike.dislikeCount}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    );
  });

  return (
    <div className={styles.main}>
      <div className={styles.leftContainer}>
        <div className={styles.logoTweeter}>
          <AiOutlineTwitter
            color="white"
            size={70}
            style={{
              transform: "rotate(180deg)",
              position: "absolute",
            }}
          />
        </div>
        <div className={styles.leftContainerBottomPart}>
          <div>
            <img
              src="tweet.jpg"
              alt="egg tweeter"
              className={styles.eggPicture}
            />
          </div>
          <div className={styles.leftContainerBottomPart1}>
            <div className={styles.leftLastBox}>
              <div className={styles.userName}>{userRed.firstname}</div>
              <div className={styles.hashtagName}>@{userRed.username}</div>
            </div>
          </div>
        </div>
        <div>
          <button className={styles.BtnLogout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.middleTopContainer}>
          <div>
            <h3>Home</h3>
          </div>
          <div className={styles.tweetInput}>
            <input
              value={newTweet}
              onChange={handleChange}
              type="text"
              placeholder="What's up ?"
              style={{
                border: "none",
                borderBottom: "2px solid gray",
                padding: "8px",
                fontSize: "16px",
                outline: "none",
                backgroundColor: "black",
                width: "600px",
                marginLeft: "55px",
                color: "#ffffff",
              }}
            />
          </div>
          <div className={styles.tweetCaracters}>
            <span className={styles.spanCount}>{count}/280</span>
            <button className={styles.BtnTweet} onClick={() => handleTweet()}>
              Tweet
            </button>
          </div>
        </div>
        <div className={styles.middleBottomContainer}>{tweetView}</div>
      </div>
      <div className={styles.rightContainer}>
        <div>
          <p>Trends</p>
        </div>
        <div className={styles.hashtagContainer}>hello</div>
      </div>
    </div>
  );
}
