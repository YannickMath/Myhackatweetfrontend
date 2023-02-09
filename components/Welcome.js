import styles from "../styles/Welcome.module.css";
import { useRouter } from "next/router";
import { AiOutlineTwitter } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addTweet, removeTweet, deleteTweet } from "@/reducers/tweet.slice";
import { logout } from "@/reducers/user.slice";
import { useEffect } from "react";
import {RiDeleteBin5Fill, RiHeart2Fill } from "react-icons/ri";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/tweets");
        const data = await response.json();
        setTweets(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    if (e.target.value.length <= 280) {
      setNewTweet(e.target.value);
      setCount(e.target.value.length);
    }
  };

  // Handle tweet
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

      console.log("DDATARESULT", data.result);
      if (response.ok) {
        dispatch(addTweet(newTweet));
        setTweets([...tweets, newTweet]);
        setNewTweet("");
        setCount(0);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/tweets");
        const data = await response.json();
        setTweets(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

//   const handleDeleteTweet = async function () => {
//     try {
//         const response = await fetch("http://localhost:3000/tweets/deleteTweet", {
//             method: "DELETE",
//         }
        
//         )
//     }
//     dispatch(removeTweet())
//     console.log()
//   }
  
  const tweetView = tweets.map((tweet, i) => {
      

    return (
      <div key={i} className={styles.tweetContainer}>
        {tweet.tweet.map((Message, j) => (
          <div key={j}>
            <div className={styles.topPartTweet}>
              <div style={{ display: "flex", alignItems:"center" }}>
                <img
                  className={styles.eggPicture}
                  src="tweet.jpg"
                  alt="egg tweeter"
                />
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {tweet.firstname}
                </p>
                <p>@{tweet.username}</p>
              </div>
              <p>{Message.tweet}</p>
            </div>
            <div >
            <RiDeleteBin5Fill onClick={() => {handleDeleteTweet}} size={20} style={{cursor:"pointer", width:'25px'}}/>
            <RiHeart2Fill size={20} style={{cursor:"pointer", width:'25px'}}/>
            </div>
          </div>
        ))}
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
      <div className={styles.rightContainer}></div>
    </div>
  );
}
