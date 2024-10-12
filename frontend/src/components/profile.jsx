import React from "react";
import { useState, useEffect } from 'react';
import Game from "./game";

function Profile({username, logout, csrf}){
    const [goGame, setGoGame] = useState(false);
    const [personalStats, setPersonalStats] = useState([]);

    let layout =  <></>;

    const fetchPersonalStats = async() => {
        try{
            const response = await fetch("http://localhost:8000/api/get_personal_stats", {
                credentials: "include",
            });
            const data = await response.json();
            setPersonalStats(data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPersonalStats();
    }, []);
    useEffect(() => {
        fetchPersonalStats();
    }, [goGame]);

    if(goGame){
        layout = (<>
            <Game username={username}
                  setGoGame={setGoGame}
                  csrf={csrf}
            />
        </>);
    }else{
        layout = (<>
            <div className="container">
                <div className="profile-header">
                    <h1>Profile Page</h1>
                    <p>You are logged in as <strong>{username}</strong></p>
                </div>
                <div className="profile-content">
                    <p>Personal Best 5:</p>
                    {personalStats.map((stat, i) => (
                        <div key={i}>
                            <p>#{i + 1} : {stat.score} / 10</p>
                            <hr />
                        </div>
                    ))}
                </div>
                <button className="btn-primary" onClick={() => {setGoGame(true);}}>
                    Start Game
                </button>
                <button className="btn-secondary" onClick={logout}>Logout</button>
                <br />
                <br />
            </div>
        </>)
    }

    return layout;
}

export default Profile;