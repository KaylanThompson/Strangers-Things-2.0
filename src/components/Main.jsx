import React, { useState, useEffect } from "react"
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom"
import { Navbar, PostsDisplay, RegistrationForm, PostEditForm, PostCreateForm, UserDashboard, Home} from "./"
import { getPostList } from "../api"

const Main = () => {
    const [postList, setPostList] = useState([])
    const [userToken, setUserToken] = useState(null)

    useEffect(() => {
        const localToken = localStorage.getItem("token")
        setUserToken(localToken)
    }, [])

    useEffect(() => {
        async function callGetPostList() {
            const fetchedList = await getPostList(userToken)
            setPostList(fetchedList)
        }
        callGetPostList()
    }, [userToken])

    
    return (
        <BrowserRouter>
            <div id="main">
                <Navbar
                    userToken={userToken}
                    setUserToken={setUserToken}
                />
                <Routes>
                    <Route
                        exact path="/postsDisplay"
                        element={
                            <PostsDisplay
                                postList={postList}
                                userToken={userToken}
                                setPostList={setPostList}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <RegistrationForm
                                setUserToken={setUserToken}
                            />
                        }
                    />
                    <Route
                        path="/post"
                        element={
                            <PostCreateForm
                                userToken={userToken}
                                setPostList={setPostList}
                            />
                        }
                    />
                    <Route
                        path="/edit/:postId"
                        element={
                            <PostEditForm
                                userToken={userToken}
                                postList={postList}
                                setPostList={setPostList}
                            />
                        }
                    />
                    <Route 
                        path="/dashboard"
                        element={
                            <UserDashboard userToken={userToken} setPostList={setPostList}/>}
                            />

                            <Route path="/"
                            element={
                                <Home />
                            } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Main
