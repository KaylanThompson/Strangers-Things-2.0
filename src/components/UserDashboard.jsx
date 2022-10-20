import React, { useEffect, useState } from 'react'
import {UserPosts, UserMessages} from './'

const UserDashboard = ({userToken}) => {
    const [userData, setUserData] = useState({})

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
        console.log("i ran the useEffect")
        async function callGetUserData() {
            const newUserData = await getUserData()
            setUserData(newUserData)
            testObj = newUserData
        }
        if (userToken) {
            callGetUserData()
        }
    },[useEffect])

    return (
        <div className='user-dashboard'>
            <h1>{`This is ${userData.username} Dashboard`}</h1>
            <UserPosts posts={userData.posts}/>
            <UserMessages messages={userData.messages}/>
        </div>
    )
}


export default UserDashboard