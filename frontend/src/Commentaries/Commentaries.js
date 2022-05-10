import React, {useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";

export default function Commentaries() {
    const params = useParams();
    const commentsUrl = 'http://127.0.0.1:8080/comments/';
    const [comments, setComments] = useState([]
    );

    function updateComments() {
        axios.get(commentsUrl + '?post=' + params.id).then((res) => {
            const comments = res.data
            setComments(comments);
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
            <CommentForm />
            {comments.map((comment) => (

                <div className="comment">
                    <h5>{comment.author_name}</h5>
                    <p>{comment.content}</p>
                    <div className="comment-buttons">
                        <a href={"/post/" + params.id + "/comment/" + comment.id + "/edit"} className="btn btn-primary">Edit</a>
                        <button onClick={() => deleteComment(comment.id)} className='btn btn-danger'>Delete</button>
                    </div>
                </div>

            ))}
        </div>
    )
}