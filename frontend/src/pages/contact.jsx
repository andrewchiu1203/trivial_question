import React from "react";
import Navbar from "../components/navbar";
import '../style/style.css';

class Contact extends React.Component {
    render() {
        return (<>
            <Navbar />
            <h1 className="center-msg">517-455-4582</h1>
        </>)
    }
}

export default Contact;