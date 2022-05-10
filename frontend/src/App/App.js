import './App.css';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import PostForm from "../PostForm/PostForm";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PostDetail from "../PostDetail/PostDetail";

function App() {
    return (

        <div className="App">
            <Header/>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Posts/>}/>
                        <Route path="/new_post" element={<PostForm/>}/>
                        <Route path="/post/:id/details"
                            element={<PostDetail/>} />
                        <Route path="/post/:id/comment/:commentId/edit"
                               element={<PostDetail/>}/>
                        <Route path="post/:id/edit"
                               element={<PostForm/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>

    );
}

export default App;
