import styles from "../styles/Home.module.css";
import { AiOutlineTwitter } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import ModalSignin from "./ModalSignin";


export default function Home({isSmallScreen}) {

  console.log('isSmallScreenonHome', isSmallScreen)
    const [modal, setModal] = useState (false)
    const [modalSignin, setModalSignin] = useState(false)

   const handleClickSignup = () => {
    setModal(true)
   
   }
   const handleClickSignin = () => {
    setModalSignin(true)
 
   }
    
  return (
    <div className={styles.main}>
      <div className={styles.leftContainer}></div>
      <div className={styles.rightContainer}>
        <div className={styles.rightTopContainer}>
          <div style={{ position: "relative" }}>
            <AiOutlineTwitter
              color="white"
              size={70}
              style={{
                transform: "rotate(180deg)",
                position: "absolute",
                left: 0,
              }}
            />
          </div>
          <div>
            <h1 className={styles.title1}>
              See what's
              <br />
              happening
            </h1>
            <h3 className={styles.title3}>Join Hackatweet today</h3>
          </div>
        </div>
        <div className={styles.rightBottomContainer}>
          <button className={styles.BtnSignup} onClick={handleClickSignup}>Sign up</button>
          <h4 className={styles.title4}>Already have an account ?</h4>
          <button className={styles.BtnSignin} onClick={handleClickSignin}>Sign in</button>
        </div>
        {modal && <Modal setModal={setModal}/>}
        {modalSignin && <ModalSignin setModalSignin={setModalSignin}/>}
      </div>
    </div>
  );
}
