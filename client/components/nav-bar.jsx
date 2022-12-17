import React from 'react';

const Navbar = (props) => {
    return (
        <div className="navbar">
            <button className="btn btn-outline mr-10 my-7">Sign Up</button>
            <button onClick={() => props.handleLogin()} className="btn btn-accent btn-outline mr-10 my-7">Log In </button>
        </div>
    )
}

export default Navbar;