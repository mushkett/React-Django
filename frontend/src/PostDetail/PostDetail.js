import "./PostDetail.css"
import React, {useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Commentaries from "../Commentaries/Commentaries";


export default function PostDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const posturl = 'http://127.0.0.1:8080/posts/'
    const [post, setPost] = useState([]);

    React.useEffect(() => {
        axios.get(posturl + params.id).then((res) => {
            const post = res.data;
            setPost(post)
        })
    }, [])

    function deletePost() {
        axios.delete(posturl + params.id + '/', {});
        navigate('/')
    }


    return (
        <div className="postdetail">
            <h1>{post.title}</h1>
            <p><a href={post.link}>{post.link}</a></p>
            <p>Upvotes: {post.upvotes}</p>
            <p>Author: {post.author_name} </p>
            <p>Creation date: {post.creation_date}</p>

            <div className="actions-buttons">
                <a className="btn btn-primary" href={"/post/" + params.id + "/edit"}>Edit</a>
                <a onClick={deletePost} className="btn btn-danger">Delete</a>
            </div>
            <Commentaries/>
        </div>
    )

}
