import React from "react";
import '../style/style.css';

function Navbar(){
    return (
        <nav className="nav-bar-container">
            <p>Trivial Questions</p>
            <ul>
                <li ><a href="/main">Home</a></li>
                <li ><a href="/about">About</a></li>
                <li ><a href="/contact">Contact</a></li>
            </ul>
        </nav>
        )
}

export default Navbar;