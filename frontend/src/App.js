import './App.css';
import Header from './Header/Header';
import Posts from './Posts/Posts';
import PostForm from "./PostForm/PostForm";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (

        <div className="App">
            <Header/>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/new_post" element={<PostForm/>}/>
                        <Route index element={<Posts/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>

    );
}

export default App;
