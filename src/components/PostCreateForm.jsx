import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getPostList } from '../api';

const PostCreateForm = ({userToken, setPostList}) => {
    const navigate = useNavigate();

    async function submitNewPost (event) {
        event.preventDefault()
        const newPost = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({
                post: {
                    title: event.target[0].value,
                    description: event.target[1].value,
                    price: event.target[2].value,
                    location: event.target[3].value,
                    willDeliver: event.target[4].value
                }
            })
        }

        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts', newPost)
            const result = await response.json()

            const newPostList = await getPostList(userToken)
            setPostList(newPostList)
            navigate('/dashboard')
        } catch (error) {
            console.log('an error happened', error)
            
        }
    }




    return (
        <div className="sell">
        <form className="PostForm" onSubmit={submitNewPost}>
                <label htmlFor="title">Title 
                    <input type="text" name="title"/>
                </label>
                <label htmlFor="description">
                    <textarea placeholder="Description of item(s)" rows='2' cols='50' name="description" />
                </label>
                <label htmlFor="price">Price
                    <input type="text" name="price"/>
                </label>
                <label htmlFor="location">Location
                    <input type="text" name="location"/>
                </label>
                <label htmlFor="willDeliver">Will Deliver
                    <select name="willDeliver">
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                </label>
                <input id="post-button" type="submit" value="Post For Sale"/>
        </form>
        </div>
    )
}



export default PostCreateForm




