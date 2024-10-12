import React from "react";
import Navbar from "../components/navbar";
import '../style/style.css';

class Error extends React.Component {
    render() {
        return (<>
            <Navbar />
            <h1 className="center-msg">404 Page Not Found</h1>
        </>)
    }
}

export default Error;