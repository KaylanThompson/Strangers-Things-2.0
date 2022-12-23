import React from "react";

const UserMessages = ({messages, username}) => {
    return (
        <div className="user-section">
            <div id="dash-h1">
                <h1>Messages</h1>
            </div>            
            {messages.map((message,index) => {
                return (
                <div key={`message_${index}`} className="individual-message">
                   <p><b>Post: </b>{message.post.title}</p>
                   <p><b>From: </b>{message.fromUser.username}</p> 
                   <p><b>Message: </b>{message.content}</p>
                </div>)
            })}
        </div>
    )
}

export default UserMessages