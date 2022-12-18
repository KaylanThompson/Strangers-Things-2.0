import React, {useState} from "react";
import { getPostList } from "../api";

const MessageForm = ({post, userToken, setPostList}) => {
    const [message, setMessage] = useState('')

    async function submitMessage(event) {
        event.preventDefault()
        const url = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts/' + post._id + '/messages'
        const messageToken = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({
                message: {
                    content: message
                }
            })
        }
        try {
            const response = await fetch(url,messageToken)
            const result = await response.json()
            setMessage('')
            const newPostList = await getPostList(userToken)
            setPostList(newPostList)
        } catch (error) {
            console.log('An error occurred', error)
        }

    }

    return (
        <><p><b>Message Seller</b></p><form className="MessageForm" onSubmit={submitMessage}>
            <input type='text' value={message} onChange={elem => { setMessage(elem.target.value); } } />
            <input type='submit' value='Send Message' />
        </form></>
    )
}

export default MessageForm