import React, { useEffect, useState } from 'react'
import {UserPosts, UserMessages} from './'

const UserDashboard = ({userToken, setPostList}) => {
    const [userData, setUserData] = useState({messages:[], posts:[]})


    async function getUserData() {
        const userDataToken = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        }

        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/users/me', userDataToken)
            const result = await response.json()
            return result.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function callGetUserData() {
            const newUserData = await getUserData()
            setUserData(newUserData)
        }
        if (userToken) {
            callGetUserData()
        }
    },[userToken])

    return (
        <div className='user-dashboard'>
            <div className='dashboard-content'>
                <UserPosts posts={userData.posts} userToken={userToken} setPostList={setPostList}/>
                <UserMessages username={userData.username} messages={userData.messages} userToken={userToken}/>
            </div>
        </div>
    )
}


export default UserDashboard