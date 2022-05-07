// import {Component} from "react";
//
//
// class Posts extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             posts: []
//         }
//     }
//
//     fetchPosts() {
//         fetch("http://127.0.0.1:8000/posts/").then((res) => res.json()).then((json) => {
//             this.setState(
//                 {
//                     posts: json
//                 })
//             console.log(this.state.posts);
//         })
//     }
//
//     render() {
//         this.fetchPosts();
//         return (
//             this.state.posts.map((item) => (
//                 <div className="container list-group-item">
//                     <h1> {item.title}</h1>
//                     id: {item.id},
//                     title: {item.author_name},
//                     body: {item.creation_date}
//                 </div>
//             ))
//         );
//     }
// }
//
// export default Posts;

import React from "react";
import axios from "axios";

export default class Posts extends React.Component{
    state = {
        posts: []
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/posts/")
            .then(res=> {
                const posts = res.data;
                this.setState({posts})
            })
    }
    render() {
        return (
            this.state.posts.map((item) => (
                <div className="container list-group-item">
                    <h1> {item.title}</h1>
                    id: {item.id},
                    title: {item.author_name},
                    body: {item.creation_date}
                </div>
            ))
        )
    }
}