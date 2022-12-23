import React, {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostList } from "../api";

const PostEditForm = ({userToken,postList, setPostList}) => {
    const navigate = useNavigate();
    const {postId} = useParams()
    const oldPost = postList.filter(elem => elem._id == postId)[0]

    const [currentPost, setCurrentPost] = useState(oldPost)

    function handleChange(event) {
        event.preventDefault()
        const changedKey = event.target.name
        const changedValue = event.target.value
        const changedPost = {...currentPost, [changedKey]: changedValue}
        setCurrentPost(changedPost)
    }

    async function submitEditPost(event) {
        event.preventDefault();
        const editToken = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                post: {
                    title: currentPost.title,
                    description: currentPost.description,
                    price: currentPost.price,
                    location: currentPost.location,
                    willDeliver: currentPost.willDeliver,
                },
            }),
        };
        try {
            const response = await fetch("https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts/"+postId, editToken);
            const result = await response.json();
            const newPostList = await getPostList(userToken)
            setPostList(newPostList)
            navigate("/dashboard");
        } catch (error) {
            console.log("an error happened", error);
        }
    }

    return (
        <form className="PostForm" onChange={handleChange} onSubmit={submitEditPost}>
            
            <label htmlFor="title">
                Title<br/>
                <input type="text" name="title" defaultValue={currentPost.title}/>
            </label>
            <label htmlFor="description">
                Description<br/>
                <textarea rows='4' cols='50' name="description" defaultValue={currentPost.description}/>
            </label>
            <label htmlFor="price">
                Price<br/>
                <input type="text" name="price" defaultValue={currentPost.price}/>
            </label>
            <label htmlFor="location">
                Location<br/>
                <input type="text" name="location" defaultValue={currentPost.location}/>
            </label>
            <label htmlFor="willDeliver">
                Will Deliver<br/>
                {/* <input type="checkbox" name="willDeliver" checked={currentPost.willDeliver} /> */}
                <select name="willDeliver" defaultValue={currentPost.willDeliver}>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                </select>
            </label>
            <input type="submit" value="Submit Post" />
        </form>
    );
};
export default PostEditForm;
