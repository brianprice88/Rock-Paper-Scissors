import React from "react";
import images from "../../images/images.js";
import "../../images/images.css";

export default function Results(props) {
  return (
    <div className="container p-3">
      <div className="row flex-nowrap">
        <div className="col lefthandlobby w3-animate-left results-thumbs">
          {props.player1choice === "rock" ? <images.leftRock /> : null}
          {props.player1choice === "paper" ? <images.leftPaper /> : null}
          {props.player1choice === "scissors" ? <images.leftScissors /> : null}
        </div>
        <div className="col w3-animate-zoom results-winner">
          {props.winner !== "tie" ? (
            <h1 className="titles">{props.winner} wins!</h1>
          ) : (
            <h1 className="titles">Tie!</h1>
          )}
        </div>
        <div className="row righthandlobby w3-animate-right results-thumbs">
          {props.player2choice === "rock" ? <images.rightRock /> : null}
          {props.player2choice === "paper" ? <images.rightPaper /> : null}
          {props.player2choice === "scissors" ? <images.rightScissors /> : null}
        </div>
      </div>
    </div>
  );
}
