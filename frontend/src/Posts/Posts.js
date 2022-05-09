import "./Posts.css"
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const url = "http://127.0.0.1:8080/posts/"

    function upvoteAction(id) {
        axios.post( url + id + "/upvote/").then(() =>
            axios.get(url)
                .then(res => {
                    const posts = res.data;
                    setPosts(posts)
                }))
    }

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                const posts = res.data;
                setPosts(posts)
            })
    }, [])

    return (
        posts.map((item) => (
            <div className="post">
                <a href={"/post/" + item.id + '/details'}> {item.title}</a>
                <p>id: {item.id}</p>
                <p>author: {item.author_name}</p>
                <p>Creation date: {item.creation_date}</p>
                <div className="upvotes">
                    <p>{item.upvotes}</p>
                    <button onClick={() => upvoteAction(item.id)} className="btn btn-sm btn-primary">Like</button>
                </div>
            </div>
        ))

    )

}