import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

export default function CommentForm() {
    const commentsUrl = 'http://127.0.0.1:8080/comments/';
    const params = useParams();
    const navigate = useNavigate();


    const [newComment, setNewComment] = useState({
        id: 0, author: "", content: "", creation_date: '', post: params.id
    });

    useEffect(() => {
        if (params.commentId) {
            axios.get("http://127.0.0.1:8080/comments/" + params.commentId)
                .then(res => {
                    const comment = res.data;
                    setNewComment({
                        author: comment.author_name,
                        id: comment.id,
                        creation_date: comment.creation_date,
                        post: params.id,
                        content: comment.content
                    })
                })
        }
    }, [])


    function handle(e) {
        const newData = {...newComment}
        newData[e.target.id] = e.target.value
        setNewComment(newData)
    }


    function handleClear(e) {
        e.preventDefault()
        setNewComment({
            author: "", content: "", post: params.id
        })
    }

    function submit(e) {
        if (params.commentId) {
            axios.put(commentsUrl + params.commentId + "/", {
                author_name: newComment.author,
                id: newComment.id,
                creation_date: newComment.creation_date,
                post: newComment.post,
                content: newComment.content
            }).then((res) => {
                console.log(res)
                handleClear(e);
            })
            navigate("/post/" + params.id + "/details")
        } else {
            e.preventDefault();
            axios.post(commentsUrl, {
                author_name: newComment.author, content: newComment.content, post: newComment.post
            }).then((res) => {
                console.log(res)
                handleClear(e);
                alert("Success!");
            }).catch((error) => {
                alert(error);
            })
        }
    }

    return (<form onSubmit={(e) => submit(e)} className="post-form">
            <label>Author:</label>
            <input onChange={(e) => handle(e)} id="author" value={newComment.author} type="text" name="author"/>


            <label>Content:</label>
            <input onChange={(e) => handle(e)} id="content" value={newComment.content} type="text" name="content"/>

            <button type="submit" className="save btn btn-primary">Save</button>
        </form>)

}