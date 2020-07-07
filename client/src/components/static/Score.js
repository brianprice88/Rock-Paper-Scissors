import React from "react";
import "../../App.css";

var Score = (props) => {
  return (
    <div className="container-fluid scoreboard">
      <div className="row flex-nowrap">
        <div className="col-lg-2">
          {" "}
          <h1 className="scoreboard-text">{props.player1score}</h1>
        </div>
        <div className="col-lg-8 scoreboard-middle">
          <h1 className="scoreboard-text">First to {props.toWin} wins!</h1>{" "}
        </div>
        <div style={{ textAlign: "right" }} className="col-lg-2">
          {" "}
          <h1 className="scoreboard-text">{props.player2score}</h1>
        </div>
      </div>
      <div className="row flex-nowrap">
        <div className="col-lg-2">
          {props.isPlayer1 ? (
            <h1 className="scoreboard-text">{props.name}</h1>
          ) : (
            <h1 className="scoreboard-text">{props.opponent}</h1>
          )}
        </div>
        <div className="col-lg-8 scoreboard-middle">
          <button className="btn btn-warning btn-lg" onClick={props.exitGame}>
            QUIT GAME
          </button>{" "}
        </div>
        <div className="col-lg-2">
          {!props.isPlayer1 ? (
            <h1 style={{ textAlign: "right" }} className="scoreboard-text">
              {props.name}
            </h1>
          ) : (
            <h1 style={{ textAlign: "right" }} className="scoreboard-text">
              {props.opponent}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Score;
