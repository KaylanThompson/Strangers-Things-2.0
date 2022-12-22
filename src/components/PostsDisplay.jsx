import React, { useState } from "react"
import { SinglePost } from "./"

const PostsDisplay = ({ postList, userToken, setPostList }) => {
    const [filteredList, setFilteredList] = useState([])
    const [searchStr, setSearchStr] = useState("")

    function handleSearch(event) {
        event.preventDefault()
        const newList = postList.filter((post) => {
            return (
                post.title.toLowerCase().includes(searchStr) ||
                post.description.toLowerCase().includes(searchStr)
            )
        })
        setFilteredList(newList)
    }

    return (
        <div className="post-page">
            <div>
                <form className="search" onSubmit={handleSearch}>
                    <input
                        id="search-bar"
                        type="text"
                        placeholder="Search for Items"
                        value={searchStr}
                        onChange={(event) => setSearchStr(event.target.value.toLowerCase())}
                    />
                </form>
            </div>
            <div id="post-header">
                <h2>All Posts</h2>
            </div>
            <div className="post-display">
                {filteredList.length
                    ? filteredList.map((elem) => {
                          return (
                              <SinglePost
                                  key={elem._id}
                                  post={elem}
                                  userToken={userToken}
                                  setPostList={setPostList}
                                  searchStr={searchStr}
                                  filteredList={filteredList}
                                  setFilteredList={setFilteredList}
                              />
                          )
                      })
                    : postList.map((elem) => {
                          return (
                              <SinglePost
                                  key={elem._id}
                                  post={elem}
                                  userToken={userToken}
                                  setPostList={setPostList}
                              />
                          )
                      })}
            </div>
        </div>
    )
}

export default PostsDisplay
