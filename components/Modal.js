import { useState } from "react";
import styles from "../styles/Modal.module.css";
import { AiOutlineTwitter } from "react-icons/ai";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "@/reducers/user.slice";

export default function Modal({ setModal }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [inputFirstname, setInputFirstname] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClickSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: inputFirstname,
          username: inputUsername,
          password: inputPassword,
        }),
      });
      const data = await response.json();
      if (data.result) {
        dispatch(
          login({
            username: inputUsername,
            firstname: inputFirstname,
            password: inputPassword,
            token: data.user.token,
          })
        );
        router.push("/welcome");
      } else {
        setErrorMessage("Authentication failed");
        setInputFirstname("");
        setInputPassword("");
        setInputUsername("");
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again later");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.logoModal}>
        <AiOutlineTwitter
          color="white"
          size={70}
          style={{
            transform: "rotate(180deg)",
          }}
        />
        <span onClick={() => setModal(false)} style={{ cursor: "pointer" }}>
          X
        </span>
      </div>
      <h2>Create your Hackatweet account</h2>
      <input
        type="text"
        placeholder="firstname"
        className={styles.inputModal}
        value={inputFirstname}
        onChange={(e) => setInputFirstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="username"
        className={styles.inputModal}
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className={styles.inputModal}
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      {errorMessage && <p>{errorMessage}</p>}
      <button className={styles.BtnSignup} onClick={handleClickSignup}>
        Signup
      </button>
    </div>
  );
}
