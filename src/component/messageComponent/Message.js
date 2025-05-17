import React from 'react';
import './Message.css'

function Message({name, message, timestamp, user, userImage}) {

    console.log(timestamp)
  return (
    <div className='message'>
      <img src={userImage} alt='profile'/>
      <div className='message__info'>
        {/* <h4>{user} {Date(timestamp?.toDate())}</h4> */}
        <h4>{user} <span className='message__timestamp'>{timestamp?.toDate().toLocaleString('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short'
})}</span></h4>
        <h5>{name}</h5>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message


