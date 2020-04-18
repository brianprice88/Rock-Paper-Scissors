import React from 'react';

export default function Topbar () {
    const rock = <i className="far fa-hand-rock" style={{ fontSize: "36px"}}></i>
    const rock2 = <i className="fas fa-hand-rock" style={{ fontSize: "36px"}}></i>
    const paper = <i className="far fa-hand-paper" style={{ fontSize: '36px'}}></i>
    const paper2 = <i className="fas fa-hand-paper" style={{ fontSize: '36px'}}></i>
    const scissors = <i className="far fa-hand-scissors" style={{ fontSize: "36px" }}></i>
    const scissors2 = <i className="fas fa-hand-scissors" style={{ fontSize: "36px" }}></i>
return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-success justify-content-center">
    <div className='row'></div>
      <div className='col'>{rock}</div>
      <div className='col'>{paper}</div>
      <div className='col'>{scissors}</div>
      <div className='col'>{rock2}</div>
      <div className='col'>{paper2}</div>
      <div className='col'>{scissors2}</div>
      <div className='col'>{rock}</div>
      <div className='col'>{paper}</div>
      <div className='col'>{scissors}</div>
      <div className='col'>{rock2}</div>
      <div className='col'>{paper2}</div>
      <div className='col'>{scissors2}</div>  
      <div className='col'>{rock}</div>
      <div className='col'>{paper}</div>
      <div className='col'>{scissors}</div>
      <div className='col'>{rock2}</div>
      <div className='col'>{paper2}</div>
      <div className='col'>{scissors2}</div>  
  </nav>
   )

}