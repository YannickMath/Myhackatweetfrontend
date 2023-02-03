import styles from "../styles/Home.module.css";
import { AiOutlineTwitter } from 'react-icons/ai';

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.leftContainer}></div>
      <div className={styles.rightContainer}>
        <div className={styles.rightTopContainer}>
      <AiOutlineTwitter color="white" size={120} style={{transform: "rotate(180deg)"}}/>
      <h1 className={styles.title1}>See what's
      <br/>happening</h1>
      <h3 className={styles.title3}>Join Hackatweet today</h3>

        </div>
        <div className={styles.rightBottomContainer}>
            <button className={styles.BtnSignup}>Sign up</button>
            <h4>Already have an account ?</h4>
            <button className={styles.BtnSignin}>Sign in</button>
        </div>
      </div>
    </div>
  );
}
