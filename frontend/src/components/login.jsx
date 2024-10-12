import React from "react";
import { useState, useEffect } from 'react';
import Signup from "./signup";

function Login({setUsername, setPassword, setRePassword, login, signup, error, setError}){
    const [goSignup, setGoSignup] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
    }

    useEffect(() => {setError("")}, [goSignup]);

    let layout =  <></>;

    if(goSignup){
        layout = (
            <Signup setUsername={setUsername}
                    setPassword={setPassword}
                    setRePassword={setRePassword}
                    setGoSignup={setGoSignup}
                    signup={signup}
                    error={error}
            />
        );
    }else{
        layout = (<>
            <form className="container" onSubmit={login}>
                <h1>Login</h1>
                <br />

                <label>Username: </label>
                <input type="text" onChange={handleUserNameChange} />
                <br />

                <label>Password: </label>
                <input type="password" onChange={handlePasswordChange} />
                <br />

                <button className="btn-primary" type="submit">Login</button>
                <button className="btn-secondary" type="button" onClick={() => {setGoSignup(true);}}>Signup</button>
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

    return layout;
}

export default Login;