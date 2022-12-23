import React, {useState} from "react";
import {SinglePost} from './'

const UserPosts = ({posts, setPostList, userToken}) => {
const activePosts = posts.filter(element => element.active)

const [filteredList, setFilteredList] = useState(posts.filter(element => element.active))

    return (
        <div className="user-section">
            <h1>Posts</h1>
            {activePosts.map((post, index) => {
                post.isAuthor = true
                //if we want we can delete the messages off of the posts here
                // post.messages = []
                return (
                    <SinglePost key={`post${index}`} post={post} setPostList={setPostList} userToken={userToken} filteredList={filteredList} setFilteredList={setFilteredList}/>
                )
            })}
        </div>
    )
}

export default UserPosts