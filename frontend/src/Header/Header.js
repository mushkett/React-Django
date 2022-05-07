import React from 'react';

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand fw-bold fs-3">React app</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active fs-4" aria-current="page" href="/">Posts</a>
                            <a className="nav-link active fs-4" href="/new_post">New post</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;