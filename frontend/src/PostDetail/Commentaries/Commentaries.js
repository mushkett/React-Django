import React, {useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Commentaries() {
    const params = useParams();
    const commentsUrl = 'http://127.0.0.1:8080/comments/';
    const [comments, setComments] = useState([]
    );

    const [newComment, setNewComment] = useState({
        id: 0,
        author: "",
        content: "",
        creation_date: '',
        post: params.id
    });

    function updateComments() {
        axios.get(commentsUrl + '?post=' + params.id).then((res) => {
            const comments = res.data

            setComments(comments);
        })
    }

    function handle(e) {
        const newData = {...newComment}
        newData[e.target.id] = e.target.value
        setNewComment(newData)
    }


    function handleClear(e) {
        e.preventDefault()
        setNewComment({
            author: "",
            content: "",
            post: params.id
        })
    }

    function submit(e) {
        e.preventDefault();
        axios.post(commentsUrl, {
            author_name: newComment.author,
            content: newComment.content,
            post: newComment.post
        }).then((res) => {
            console.log(res)
            handleClear(e);
            updateComments();
            alert("Success!");


        }).catch((error) => {
            alert(error);

        })
    }

    React.useEffect(() => {
        updateComments()
    }, [])

    function deleteComment(commentId) {
        axios.delete(commentsUrl + commentId + "/")
            .then((res) => {
                updateComments();
                alert("Success!")
            }).catch((error) => {
            alert(error)
        })

    }


    return (
        <div className="comments">
            <form onSubmit={(e) => submit(e)} className="post-form" method="POST">
                <label>Author:</label>
                <input onChange={(e) => handle(e)} id="author" value={newComment.author} type="text" name="author"/>


                <label>Content:</label>
                <input onChange={(e) => handle(e)} id="content" value={newComment.content} type="text" name="content"/>

                <button type="submit" className="save btn btn-primary">Save</button>
            </form>
            {comments.map((comment) => (

                <div className="comment">
                    <h5>{comment.author_name}</h5>
                    <p>{comment.content}</p>
                    <div className="comment-buttons">
                        <button className="btn btn-primary">Edit</button>
                        <button onClick={() => deleteComment(comment.id)} className='btn btn-danger'>Delete</button>
                    </div>
                </div>

            ))}
        </div>
    )
}