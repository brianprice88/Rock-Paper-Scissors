import React from "react";

export default function Picker(props) {
  return (
    <div className="container-fluid">
      <h4 className="choose">Make your choice</h4>
      <div className="row picker">
        <div className="col-sm-3">
          <button
            onClick={() => props.makeSelection("rock")}
            type="button"
            className="btn btn-secondary gameBtn select-btn"
          >
            <i className="far fa-hand-rock select-img"></i>
          </button>
        </div>
        <div className="col-sm-3">
          <button
            onClick={() => props.makeSelection("paper")}
            type="button"
            className="btn btn-secondary gameBtn select-btn"
          >
            <i className="far fa-hand-paper select-img"></i>
          </button>
        </div>
        <div className="col-sm-3">
          <button
            onClick={() => props.makeSelection("scissors")}
            type="button"
            className="btn btn-secondary gameBtn select-btn"
          >
            <i className="far fa-hand-scissors select-img"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
