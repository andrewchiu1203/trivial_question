import React from "react";

function Signup({setUsername, setPassword, setRePassword, setGoSignup, signup, error}){
    const handleRePasswordhange = (event) => {
        setRePassword(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
    }

    return (<>
        <form className="container" onSubmit={signup}>
            <h1>Signup</h1>
            <br />

            <label>Username: </label>
            <input type="text" onChange={handleUserNameChange} />
            <br />

            <label>Password: </label>
            <input type="password" onChange={handlePasswordChange} />
            <br />

            <label>Password Again: </label>
            <input type="password" onChange={handleRePasswordhange} />
            <br />

            <button className="btn-primary" type="submit">Signup</button>
            <button className="btn-secondary" type="button" onClick={() => {setGoSignup(false);}}>
                Go Back
            </button>
            <br />
            <br />
        </form>            

        {error &&
            <small>
                {error}
            </small>
        }
    </>);
}

export default Signup;