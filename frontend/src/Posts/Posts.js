import "./Posts.css"
import React from "react";
import axios from "axios";

export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    upvoteAction(id){
        axios.post("http://127.0.0.1:8000/posts/" + id + "/upvote/").then( () =>
        axios.get("http://127.0.0.1:8000/posts/")
            .then(res => {
                const posts = res.data;
                this.setState({posts})
            }))

    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/posts/")
            .then(res => {
                const posts = res.data;
                this.setState({posts})
            })
    }
    render() {
        return (
                this.state.posts.map((item) => (
                <div className="post">
                    <h3> {item.title}</h3>
                    <p>id: {item.id}</p>
                    <p>author: {item.author_name}</p>
                    <p>Creation date: {item.creation_date}</p>
                    <div className="upvotes">
                        <p>{item.upvotes}</p>
                        <button onClick={() => this.upvoteAction(item.id)} className="btn btn-sm btn-primary">Like</button>
                    </div>
                </div>
            ))

        )

    }
}