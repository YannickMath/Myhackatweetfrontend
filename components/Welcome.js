import styles from "../styles/Welcome.module.css";
import { useRouter } from "next/router";
import { AiOutlineTwitter } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Welcome() {
  const router = useRouter();
  const userRed = useSelector((state) => state.user.value);

  const [count, setCount] = useState(0);
  const [caracters, setCaracters] = useState('');

  const handleChange = (e) => {
    if (e.target.value.length <= 280) {
        setCaracters(e.target.value)
        setCount(e.target.value.length)
      }
  }

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
              src="egg1.jpg"
              alt="egg tweeter"
              className={styles.eggPicture}
            />
          </div>
          <div className={styles.leftContainerBottomPart1}>
            <div className={styles.leftLastBox}>
              <div className={styles.userName}>{userRed.username}</div>
              <div className={styles.hashtagName}>@{userRed.username}</div>
            </div>
          </div>
        </div>
        <div>
          <button className={styles.BtnLogout}>Logout</button>
        </div>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.middleTopContainer}>
          <div>
            <h3>Home</h3>
          </div>
          <div className={styles.tweetInput}>
            <input
              value={caracters}
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
                color:"#ffffff",
              }}
            />
          </div>
          <div className={styles.tweetCaracters}>
            <span className={styles.spanCount}>{count}/280</span>
            <button className={styles.BtnTweet}>Tweet</button>
          </div>
        </div>
        <div className={styles.middleBottomContainer}></div>
      </div>
      <div className={styles.rightContainer}></div>
    </div>
  );
}
