import './PostForm.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

function PostForm() {
    const navigate = useNavigate();
    const url = "http://127.0.0.1:8080/posts/"
    const params = useParams();

    const [data, setData] = useState({
        id: 0,
        title: "",
        link: "",
        author: "",
        creation_date:'',
        upvotes: 0
    });

    useEffect(() => {
            if (params.id) {
                console.log(params.id)
                axios.get(url + params.id)
                    .then(res => {
                        const post = res.data;
                        setData({
                            title: post.title,
                            link: post.link,
                            author: post.author_name,
                            id:post.id,
                            creation_date: post.creation_date,
                            upvotes: post.upvotes
                        })
                    })
            }
        }, []
    )

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    function handleClear(e) {
        e.preventDefault()
        setData({
            title: "",
            link: "",
            author: ""
        })
    }


    function submit(e) {
        if (params.id) {
            axios.put(url + params.id + "/",
                {
                    title: data.title,
                    link: data.link,
                    author_name: data.author,
                    id: data.id,
                    upvotes: data.upvotes,
                    creation_date: data.creation_date

                })

            navigate("/post/" + params.id + "/details")
        } else {
            e.preventDefault();
            axios.post(url, {
                title: data.title,
                link: data.link,
                author_name: data.author
            }).then((res) => {
                console.log(res)
                handleClear(e)
                alert("Success!")
                navigate('/')
            }).catch((error) => {
                alert(error)
            })
        }

    }

    return (<div className="form-div">
        <form onSubmit={(e) => submit(e)} className="post-form">
            <label>Title:</label>
            <input onChange={(e) => handle(e)} id="title" value={data.title} type="text" name="title"/>

            <label>Link:</label>
            <input onChange={(e) => handle(e)} id="link" value={data.link} type="url" name="link"/>

            <label>Author:</label>
            <input onChange={(e) => handle(e)} id="author" value={data.author} type="text" name="author"/>

            <button type="submit" className="save btn btn-primary">Save</button>
        </form>
    </div>)
}


export default PostForm;