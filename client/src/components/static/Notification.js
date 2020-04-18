import React from 'react'

export default function Notification (props) {
    return (
        <div className="alert alert-primary alert-dismissable fade show waiting" role="alert">
            <strong>{props.text}</strong>
            <button className="close" type="button" data-dismiss="alert">
                <span>&times;</span>
            </button>
        </div>
    )
}