import React, { useCallback, useEffect, useRef, useState } from "react";
import rockImage from "../../asset/rock.png";
import paperImage from "../../asset/paper.png";
import scissorImage from "../../asset/scissor.png";
import "./RpsGame.css";

const RpsGame = () => {
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [msg, setMsg] = useState("Play Your Move");
  const [compResponse, setCompResponse] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const msgRef = useRef(null);

  const genCompChoice = useCallback(() => {
    const options = ["Rock", "Paper", "Scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
  }, []);

  const drawGame = () => {
    setIsDraw(true);
    setMsg("Game was Draw. Play again.");
    msgRef.current.style.backgroundColor = "#081b31";
  };

  const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
      setUserScore((prevScore) => prevScore + 1);
      setMsg(`You win! Your ${userChoice} beats ${compChoice}`);
      if (msgRef) {
        msgRef.current.style.backgroundColor = "green";
      }
    } else {
      setCompScore((prevScore) => prevScore + 1);
      setMsg(`You lost. ${compChoice} beats your ${userChoice}`);
      if (msgRef) {
        msgRef.current.style.backgroundColor = "red";
      }
    }
  };

  const playGame = useCallback(
    (userChoice) => {
      const compChoice = genCompChoice();
      if (compChoice === "Rock") setCompResponse(rockImage);
      else if (compChoice === "Paper") setCompResponse(paperImage);
      else setCompResponse(scissorImage);

      if (userChoice === compChoice) {
        drawGame();
      } else {
        setIsDraw(false);
        let userWin = true;
        if (userChoice === "Rock") {
          userWin = compChoice === "Paper" ? false : true;
        } else if (userChoice === "Paper") {
          userWin = compChoice === "Scissors" ? false : true;
        } else {
          userWin = compChoice === "Rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
      }
    },
    [genCompChoice]
  );

  useEffect(() => {
    const choices = document.querySelectorAll(".choice");

    const handleClick = (event) => {
      const userChoice = event.target.alt;
      playGame(userChoice);
    };

    choices.forEach((choice) => {
      choice.addEventListener("click", handleClick);
    });

    return () => {
      choices.forEach((choice) => {
        choice.removeEventListener("click", handleClick);
      });
    };
  }, [playGame]);

  return (
    <>
      <h1>Rock Paper Scissors</h1>
      <div className="choices">
        <div>
          <div className="choice" id="rock">
            <img src={rockImage} alt="Rock" />
          </div>
          <p>Rock</p>
        </div>

        <div>
          <div className="choice" id="paper">
            <img src={paperImage} alt="Paper" />
          </div>
          <p>Paper</p>
        </div>

        <div>
          <div className="choice" id="scissors">
            <img src={scissorImage} alt="Scissors" />
          </div>
          <p>Scissors</p>
        </div>
      </div>

      <div className="score-board">
        <div className="score">
          <p id="user-score">{userScore}</p>
          <p>You</p>
        </div>
        <div className="score">
          <p id="comp-score">{compScore}</p>
          <p>Comp</p>
        </div>
      </div>

      <div className="msg-container">
        <p id="msg" ref={msgRef}>
          {msg}
        </p>
      </div>

      {(userScore > 0 || compScore > 0 || isDraw) && (
        <div>
          <p id="compRes">Computer's Response</p>
          <div id="comp-response">
            <img src={compResponse} alt="computer-response" />
          </div>
        </div>
      )}
    </>
  );
};

export default RpsGame;
