import React from 'react'

export default function WaitingforOpponent(props) {
    return (
        <div className="alert alert-primary alert-dismissable fade show waiting" role="alert">
            Waiting for your opponent to {props.action}!
            <button className="close" type="button" data-dismiss="alert">
                <span>&times;</span>
            </button>
        </div>
    )
}