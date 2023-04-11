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
import UploadImage from "./UploadImage";
// import ScrollToTopButton from "./ScrollToTopButton";
import ReactModal from "react-modal";
import { createEntityAdapter } from "@reduxjs/toolkit";

export default function Welcome() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // console.log("isSmallScreen value in parent:", isSmallScreen);
  console.log("ISSMALLSCREEN", isSmallScreen);

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

  // Router hook
  const router = useRouter();

  // Dispatch hook
  const dispatch = useDispatch();

  // Selectors to access the user and tweet values from the store
  const userRed = useSelector((state) => state.user.value);

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
  const [modal, setModal] = useState(false);

  const handleCloseComment = () => {
    setModal(false);
  };

  const handleThemeChange = () => {
    setIsLightMode(!isLightMode);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://myhackatweetbackend.vercel.app/tweets"
      );
      const data = await response.json();
      if (data.result) {
        setTweets(data.user);
        const regex = /#\S+\b/g;
        const tags = data.user
          .map((tweet) => tweet.tweet.tweet)
          .flat()
          .map((message) => {
            if (typeof message === "string") {
              const match = message.match(regex);
              return match ? match : [];
            } else {
              return [];
            }
          })
          .flat();
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

  //fonction qui detecte si un hashtag est clické : true/false et nom du hashtag
  const handleClickNameHash = (hash) => {
    setClickHashtag(true);
    setClickNameHash(hash);
  };

  const handleTweet = async () => {
    if (newTweet.length < 1) {
      return;
    }
    try {
      const response = await fetch(
        `https://myhackatweetbackend.vercel.app/tweets/tweet/${userRed.token}`,
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
        `https://myhackatweetbackend.vercel.app/tweets/deleteTweet/${token}/${tweetId}`,
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
        `https://myhackatweetbackend.vercel.app/tweets/likeTweet/${token}/${tweetId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like tweet");
      }
      await response.json();
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
        `https://myhackatweetbackend.vercel.app/tweets/dislikeTweet/${token}/${tweetId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to dislike tweet");
      }
      await response.json();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  //fonction pour compter le nombre de hashtag identique
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
    if (e.key === "Enter") {
      handleTweet();
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setNewTweet(e.target.value.slice(0, 279));
    setCount(e.target.value.length);
  };

  const tweetView = tweets.map((tweet, i) => {
    return (
      <Tweet
        key={i}
        tweet={tweet}
        clickNameHash={clickNameHash}
        clickHashtag={clickHashtag}
        handleDislikeTweet={handleDislikeTweet}
        handleLikeTweet={handleLikeTweet}
        handleDeleteTweet={handleDeleteTweet}
        isLightMode={isLightMode}
        isSmallScreen={isSmallScreen}
        modal={modal}
        setModal={setModal}
        handleCloseComment={handleCloseComment}
      />
    );
  });

  const [modalTrendIsOpen, setModalTrendIsOpen] = useState(false);

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  return (
    <div
      className={styles.main}
      style={{
        color: isLightMode ? "black" : "black",
        backgroundColor: isLightMode ? "#DCD8F3" : "black",
        border: isLightMode ? "gray" : "black",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <div
        className={styles.leftContainer}
        style={{ backgroundColor: isLightMode ? "#DCD8F3" : "black" }}
      >
        <div className={styles.logoTweeter}>
          <AiOutlineTwitter
            size={70}
            style={{
              // size: isSmallScreen ? "10" : "0",
              transform: "rotate(180deg)",
              position: "absolute",
              color: isLightMode ? "black" : "#2707F1",
              marginTop: "12px",
              marginLeft: "5px",
            }}
          />
        </div>
        <div
          className={styles.leftContainerBottomPart}
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "flex-end",
            // height: "500px",
            marginBottom: "40px",
            marginLeft: "10px",
          }}
        >
          <div>
            <UploadImage isSmallScreen={isSmallScreen} />
          </div>
          <div className={styles.leftContainerBottomPart1}>
            <div className={styles.leftLastBox}>
              <div
                className={styles.firstName}
                style={{
                  color: isLightMode && "black",
                  marginLeft: "5px",
                  // fontSize: isSmallScreen ? "13px" :"18px",
                }}
              >
                {userRed.firstname}
              </div>
              <div
                className={styles.userName}
                style={{
                  color: isLightMode ? "black" : "white",
                  marginLeft: "5px",
                  // fontSize: isSmallScreen ? "12px" : "17px",
                }}
              >
                @{userRed.username}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: isSmallScreen && "50vw",
            height: isSmallScreen && "10vh",
            marginTop: isSmallScreen && "-100px",
            marginLeft: isSmallScreen && "300px",
          }}
        >
          <button
            className={styles.BtnLogout}
            style={{
              backgroundColor: isLightMode ? "black" : "#2707F1",
            }}
            onClick={handleLogout}
          >
            {isSmallScreen ? "I" : "Logout"}
          </button>
        </div>
      </div>
      <div
        className={styles.middleContainer}
        style={{ borderColor: isLightMode ? "black" : "gray" }}
      >
        <div
          className={styles.middleTopContainer}
          style={{ backgroundColor: isLightMode ? "#DCD8F3" : "black" }}
        >
          <div style={{ display: "flex", alignItems: isSmallScreen ? "flex-end" : "center", height: isSmallScreen && "4vh" , justifyContent: isSmallScreen && "space-between", width: isSmallScreen && "90vw" }}>
            <h3
              style={{
                width: isSmallScreen ? "70vw" : "200px",
                color: isLightMode ? "black" : "white",
                marginLeft: isSmallScreen ? "15px" : "5px",
                height: isSmallScreen && "2vh"
                // display: isSmallScreen && "none",
              }}
            >
              {!clickHashtag ? "Home" : `${clickNameHash.slice(0, 25)}...`}
            </h3>
            {clickHashtag && (
              // <div>
              <p
                onClick={handleCloseHashtag}
                style={{
                  paddingLeft: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "15px",
                  textDecoration: "underline",
                  width:  isSmallScreen ? "15%": "20%",
                  cursor: "pointer",
                  color: isLightMode ? "black" : "blue",
                  marginLeft: clickHashtag ? (isSmallScreen ? "0px" : "160px") : "",
                }}
              >
                Back
              </p>
              // </div>
            )}
          </div>
          <div style={{height: isSmallScreen && "14vh"}}>
            <input
              onKeyDown={handleKeyDown}
              value={newTweet}
              onChange={handleChange}
              type="text"
              placeholder="What's up ?"
              className={styles.msgTweet}
              style={{
                color: "black",
                backgroundColor: isLightMode ? "white" : "white",
                borderRadius: "20px",
                width: "90%",
              }}
            />
          </div>
          <div className={styles.tweetCaracters}>
            <span
              className={styles.spanCount}
              style={{ color: isLightMode ? "black" : "white" }}
            >
              {count}/280
            </span>

            <button
              className={styles.BtnTweet}
              onClick={() => handleTweet()}
              style={{
                backgroundColor: isLightMode ? "black" : "#2707F1",
              }}
            >
              Tweet
            </button>
          </div>
        </div>
        <div
          className={styles.middleBottomContainer}
          style={{ backgroundColor: isLightMode ? "#DCD8F3" : "black" }}
        >
          <button style={{position: "absolute", zIndex: "50", cursor: "pointer " }} onClick={handleScrollToTop}>
            </button>
          {tweetView}
        </div>
      </div>
      <div
        className={styles.rightContainer}
        style={{ backgroundColor: isLightMode ? "#DCD8F3" : "black" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            alignItems: "center",
            height: isSmallScreen && "3vh",
           
          }}
        >
          <h3
             
              style={{ color: isLightMode ? "black" : "white", justifyContent: "center"}}
            onClick={() => setModalTrendIsOpen(true)}
          >
            Trends
          </h3>
          <BsLightningFill
            style={{
              cursor: "pointer",
              color: isLightMode ? "black" : "white",
              marginLeft: "80px",
              justifyContent: "center"
            }}
            size={20}
            onClick={handleThemeChange}
          />
          <span style={{ color: isLightMode ? "black" : "white" , justifyContent: "center"}}>
            LightMode
          </span>
        </div>

        {!isSmallScreen && (
          <div
            className={styles.hashtagContainer}
            style={{
              backgroundColor: isLightMode ? "rgb(31, 30, 30)" : "#EAEAE7",
            }}
          >
            {hashtag.map((e, i) => {
              let hash = e?.substring(0);

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
                      style={{
                        color: isLightMode ? "#ffffff" : "black",
                        fontSize: "20px",
                        height: "0.5vh",
                      }}
                    >
                      {hash.length > 22 ? `${hash.slice(0, 22)}...` : hash}
                    </h3>
                  </a>
                  <div
                    style={{ display: "flex", color: "gray", height: "5vh" }}
                  >
                    <p>{countIdenticalStrings(hashtagCopy, hash)}</p>
                    <p style={{ marginLeft: "5px" }}>
                      {countIdenticalStrings(hashtagCopy, hash) === 1
                        ? "Tweet"
                        : "Tweets"}{" "}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ReactModal
        isOpen={modalTrendIsOpen}
        onRequestClose={() => setModalTrendIsOpen(false)}
      >
        <div
          className={styles.hashtagContainer}
          style={{
            backgroundColor: isLightMode ? "rgb(31, 30, 30)" : "#EAEAE7",
          }}
        >
          <p onClick={() => setModalTrendIsOpen(false)} style={{color: isLightMode && "white"}}>X</p>
          {hashtag.map((e, i) => {
            let hash = e?.substring(0);

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
                    onClick={() => {
                      handleClickNameHash(hash);
                      setModalTrendIsOpen(false);
                    }}
                    style={{
                      color: isLightMode ? "#ffffff" : "black",
                      fontSize: "20px",
                      height: "0.5vh",
                    }}
                  >
                    {hash.length > 22 ? `${hash.slice(0, 22)}...` : hash}
                  </h3>
                </a>
                <div style={{ display: "flex", color: "gray", height: "5vh" }}>
                  <p>{countIdenticalStrings(hashtagCopy, hash)}</p>
                  <p style={{ marginLeft: "5px" }}>
                    {countIdenticalStrings(hashtagCopy, hash) === 1
                      ? "Tweet"
                      : "Tweets"}{" "}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ReactModal>
    </div>
    // </div>
  );
}
