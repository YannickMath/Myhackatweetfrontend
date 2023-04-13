import styles from "../styles/Home.module.css";
import { AiOutlineTwitter } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import ModalSignin from "./ModalSignin";
import { useEffect } from "react";
import { BsJustify } from "react-icons/bs";

export default function Home() {
  // console.log('isSmallScreenonHome', isSmallScreen)
  const [modal, setModal] = useState(false);
  const [modalSignin, setModalSignin] = useState(false);
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

  const handleClickSignup = () => {
    setModal(true);
  };
  const handleClickSignin = () => {
    setModalSignin(true);
  };

  return (
    <div className={styles.main}>
      <div className={styles.leftContainer}></div>
      <div className={styles.rightContainer}>
        <div className={styles.rightTopContainer}>
          <div style={{ position: "relative"}}>
            <AiOutlineTwitter
              size={70}
              color="white"
              // size={70}
              style={{
                transform: "rotate(180deg)",
                position: "absolute",
                left: isSmallScreen && "40%",
                // marginLeft: isSmallScreen && "37%",
                marginTop: isSmallScreen && "6%",
              }}
            />
          </div>
          <div >
            <h1 className={styles.title1}>
              See what's
              <br />
              happening
            </h1>
            <h3 className={styles.title3}>Join Hackatweet today</h3>
          </div>
        </div>
        <div className={styles.rightBottomContainer}>
          <button className={styles.BtnSignup} onClick={handleClickSignup}>
            Sign up
          </button>
          <h4 className={styles.title4}>Already have an account ?</h4>
          <button className={styles.BtnSignin} onClick={handleClickSignin}>
            Sign in
          </button>
        </div>
        {modal && <Modal setModal={setModal} isSmallScreen={isSmallScreen} />}
        {modalSignin && <ModalSignin setModalSignin={setModalSignin} isSmallScreen={isSmallScreen}/>}
      </div>
    </div>
  );
}
