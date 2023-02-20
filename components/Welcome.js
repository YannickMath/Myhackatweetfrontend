import styles from "../styles/Welcome.module.css";
import { useRouter } from "next/router";
import { AiOutlineTwitter } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { BsLightningFill } from "react-icons/bs";
import { useState } from "react";
import { logout } from "@/reducers/user.slice";
import { useEffect } from "react";

import React from "react";
import Tweet from "../components/Tweet";

export default function Welcome() {
  // Router hook
  const router = useRouter();

  // Dispatch hook
  const dispatch = useDispatch();

  // Selectors to access the user and tweet values from the store
  const userRed = useSelector((state) => state.user.value);
  const tweetRed = useSelector((state) => state.tweet.value);

  // State for tweet and count
  //Etat pour compter le nombre de hashtag
  const [count, setCount] = useState(0);
  const [hashtagCopy, setHashtagCopy] = useState([]);

  //Etat pour charger tous les hashtags au chargement de la page
  const [hashtag, setHashtag] = useState([]);
  //ETat pour charger l'input du nouveau tweet posté
  const [newTweet, setNewTweet] = useState("");
  //Etat pour charger les user au chargement de lapage
  const [tweets, setTweets] = useState([]);
  //Etat pour compter le nombre de hashtag
  const [clickHashtag, setClickHashtag] = useState(false);
  const [clickNameHash, setClickNameHash] = useState("");

  const [isLightMode, setIsLightMode] = useState(false);

  {
  }

  const handleThemeChange = () => {
    console.log("themechanger");
    console.log("themechanger.Value", isLightMode);
    setIsLightMode(!isLightMode);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tweets");
      const data = await response.json();
      if (data.result) {
        setTweets(data.user);
        const regex = /#\S+\b/g;
        const tags = data.user.flatMap((tweet) =>
          tweet.tweet.flatMap((message) => {
            const match = message.tweet.match(regex);
            return match ? match : [];
          })
        );
        setHashtag([...new Set(tags)]);
        setHashtagCopy(tags.filter((tag) => tag !== null));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userRed.token) {
      fetchData();
    }
  }, [userRed.token]);


  const handleClickNameHash = (hash) => {
    setClickHashtag(true);
    setClickNameHash(hash);
  };

  // Handle input change
  const handleChange = (e) => {
    if (e.target.value.length > 0 || e.target.value.length <= 280) {
      setNewTweet(e.target.value);
      setCount(e.target.value.length);
    }
  };

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

      await response.json();
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

  const handleCloseHashtag = () => {
    setClickHashtag(false);
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
      if (response.ok) {
        fetchData();
      } else {
        throw new Error("Failed to dislike tweet to the store");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function countIdenticalStrings(arr, str) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === str) {
        count++;
      }
    }
    return count;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" ) {
      handleTweet();
    }
  };

  const sortedTweets = (tweets) => {
    return tweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const tweetView = sortedTweets(tweets).map((tweet, i) => {
    return (
      <Tweet
        key={i}
        tweet={tweet}
        clickNameHash={clickNameHash}
        clickHashtag={clickHashtag}
        handleDislikeTweet={handleDislikeTweet}
        handleLikeTweet={handleLikeTweet}
        handleDeleteTweet={handleDeleteTweet}
      />
    );
  });

  return (
    // <div className={isLightMode & "light"}>
    // <div className={isLightMode ? "light" : "main"}>
    <div className={styles.main} style={{color: isLightMode ? "black" : "black", backgroundColor: isLightMode ? "#2C74F9" : "black", border: isLightMode ? "solid 5px gray" : "black"}}>
      <div className={styles.leftContainer}>
        <div className={styles.logoTweeter}>
          <AiOutlineTwitter
            size={70}
            style={{
              transform: "rotate(180deg)",
              position: "absolute",
             color: isLightMode ? "black" : "white", 
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
              <div className={styles.userName} style={{color: isLightMode ? "black" : "white" }}>{userRed.firstname}</div>
              <div className={styles.hashtagName} style={{color: isLightMode ? "black" : "white" }}>@{userRed.username}</div>
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
            <h3 style={{color: isLightMode ? "black" : "white"}}>{!clickHashtag ? "Home" : `${clickNameHash}`}</h3>
            {clickHashtag && (
              <p onClick={handleCloseHashtag} style={{ cursor: "pointer" }}>
                x
              </p>
            )}
          </div>
          <div className={styles.tweetInput} >
            <input
              onKeyDown={handleKeyDown}
              value={newTweet}
              onChange={handleChange}
              type="text"
              placeholder={!clickHashtag ? "What's up ?" : ""}
              className={styles.msgTweet}
              style={{color: isLightMode ? "white" : "black", backgroundColor: isLightMode ? "black" : "white", borderRadius: "20px"}}
            />
          </div>
          <div className={styles.tweetCaracters}>
            <span className={styles.spanCount} style={{color: isLightMode ? "black" : "white"}}>
              {!clickHashtag ? count : ""}
              {!clickHashtag ? "/280" : ""}
            </span>
            {!clickHashtag ? (
              <button className={styles.BtnTweet} onClick={() => handleTweet()}>
                Tweet
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.middleBottomContainer}>{tweetView}</div>
      </div>
      <div className={styles.rightContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            alignItems: "center",
          }}
        >
          <h3 style={{color: isLightMode ? "black" : "white"}}>Trends</h3>
          <BsLightningFill
            style={{ cursor: "pointer", color: isLightMode ? "black" : "white" }}
            size={20}
            onClick={handleThemeChange}
          />
        </div>

        <div className={styles.hashtagContainer}>
          {hashtag.map((e, i) => {
            let hash = e?.substring(0);
            const count = countIdenticalStrings(hashtagCopy, e);

            return (
              <div key={i} className={styles.hashPostContainer}>
                <a
                  // href={hash}
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    cursor: "pointer",
                  }}
                >
                  <h3
                    onClick={() => handleClickNameHash(hash)}
                    style={{ color: "#ffffff", fontSize: "25px" }}
                  >
                    {e}
                  </h3>
                </a>
                <p style={{ color: "gray" }}>
                  {count ? `${count} tweets` : `${count} tweet`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    // </div>
  );
}
