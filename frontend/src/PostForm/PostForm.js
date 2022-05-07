import './PostForm.css'
import React, {useState} from "react";
import axios from "axios";

function PostForm() {
    const url = "http://127.0.0.1:8000/posts/"
    const [data, setData] = useState({
        title: "",
        link: "",
        author: ""
    })

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

        e.preventDefault();
        axios.post(url, {
            title: data.title,
            link: data.link,
            author_name: data.author
        }).then(
            (res) => {
                console.log(res)
                handleClear(e)

                alert("Success!")
            }
        ).catch((error) => {
            alert(error)
        })

    }

    return (
        <div className="form-div">
            <form onSubmit={(e) => submit(e)} className="post-form" method="POST">
                <label>Title:</label>
                <input onChange={(e) => handle(e)} id="title" value={data.title} type="text" name="title"/>

                <label>Link:</label>
                <input onChange={(e) => handle(e)} id="link" value={data.link} type="url" name="link"/>

                <label>Author:</label>
                <input onChange={(e) => handle(e)} id="author" value={data.author} type="text" name="author"/>

                <button type="submit" className="save btn btn-primary">Save</button>
            </form>
        </div>
    )
}


export default PostForm;