import './App.css';
import Header from './Header/Header';
import Posts from './Posts/Posts';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (

        <div className="App">
            <Header/>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/posts" element={<Posts/>}/>
                        <Route index element={<div>Default Page Content</div>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>

    );
}

export default App;
