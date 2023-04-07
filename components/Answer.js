import { useEffect, useState } from "react";
import moment from "moment";
import CommentAnswer from "./CommentAnswer";

export default function Answer(props) {
  const { commentId, newAnswer } = props;
  const [answers, setAnswers] = useState([]);

  // console.log("COMMENTID", commentId);

  const fetchAnswers = async () => {
    try {
      const response = await fetch(
        `https://myhackatweetbackend.vercel.app/tweets/commentAnswers/${commentId}`
      );
      const data = await response.json();
      if (data.result) {
        setAnswers(data.answers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [commentId, newAnswer]);

 
  return (
    <div>
      {answers.map((answer, i) => {
        const date = moment(answer.createdAt);
        const formattedDate = date.format("DD/MM/YYYY à HH:mm:ss");
        return (
          <div
            key={i}
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              width: "147%",
              backgroundColor: "rgba(99, 99, 99, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",

                width: "100%",
              }}
            >
              <p style={{ marginRight: "5%", color: "gold" }}>{answer.username}</p>
              <p
                style={{
                  display: "flex",
                  maxHeight: "18vh",
                  maxWidth: "35vw",
                  flexDirection: "column",
                  wordWrap: "break-word",
                  alignContent: "center",
                }}
              >
                {answer.answer}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p style={{ fontSize: "50%" }}>{formattedDate}</p>
            
             
            </div>
          </div>
        );
      })}
    </div>
  );
}
