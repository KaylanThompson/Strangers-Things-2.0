import React from "react";
import {getPostList} from '../api'
import {MessageForm, MessagesPanel} from "./";
import { NavLink } from "react-router-dom";

const SinglePost = ({post, userToken, setPostList, filteredList, setFilteredList}) => {
    async function deletePost () {
        try {
         const deleteToken = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
         }  
         const url = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts/' + post._id
         const response = await fetch(url, deleteToken)
         const result = await response.json()
         console.log(result)

         if (filteredList.length) {
            const newList = filteredList.filter(elem => elem._id != post._id)
            setFilteredList(newList)
         }

         const newList = await getPostList(userToken)
         setPostList(newList)  
        } catch (error) {
          console.log("an error occurred", error)  
        }

    }


    return (
        <div className={post.isAuthor ? "single-post author" : "single-post"}>
            <h3>{post.title}</h3>
            <p><b>Seller: </b>{post.author.username}</p>
            <p><b>Location: </b>{post.location}</p>
            <p><b>Price: </b>{post.price}</p>
            <p>{post.description}</p>
            <p><b>{post.willDeliver ? "Will Deliver" : "No Delivery"}</b></p>
            {userToken
            ? <>{post.isAuthor 
                ? <div className="message-buttons">
                    <button onClick={deletePost}>Delete</button>
                    <NavLink to={`/edit/${post._id}`}><button>Edit</button></NavLink>
                </div>
                :<MessageForm post={post} userToken={userToken} setPostList={setPostList}/>}</>
            : null}
        </div>
    )
}

export default SinglePost