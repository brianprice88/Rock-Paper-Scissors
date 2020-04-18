import React from 'react'

export default function Error(props) {
  return (
    <div className="alert alert-warning fade show" role="alert">
      <strong>Error!</strong> {props.errorMessage}
      <button onClick={props.clearError} type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}