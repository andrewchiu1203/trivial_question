import React from "react";
import Login from "../components/login";
import Profile from "../components/profile";
import Navbar from "../components/navbar";
import '../style/style.css';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            csrf: "",
            isAuthenticated: false,

            usernameCertified: "",
            username: "",

            password: "",
            rePassword: "",

            error: "",
        };
    }

    componentDidMount = () => {
        this.getSession();
    }

    getCSRF = () => {
        fetch("http://localhost:8000/api/csrf/", {
            credentials: "include",
        })
        .then((res) => {
            let csrfToken = res.headers.get("X-CSRFToken");
            this.setState({csrf: csrfToken});
            console.log(csrfToken);
        })
            .catch((err) => {
            console.log(err);
        });
    }

    whoami = () => {
        fetch("http://localhost:8000/api/whoami/", {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({usernameCertified: data.username})
            console.log("You are logged in as: " + data.username);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getSession = () => {
        fetch("http://localhost:8000/api/session/", {
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.isAuthenticated) {
                this.setState({isAuthenticated: true});
                this.getCSRF();
                this.whoami();
            } else {
                this.setState({isAuthenticated: false});
                this.getCSRF();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    setPassword = (password) => {
        this.setState({password: password});
    }

    setRePassword = (rePassword) => {
        this.setState({rePassword: rePassword});
    }

    setUsername = (username) => {
        this.setState({username: username});
    }

    setError = (error) => {
        this.setState({error: error});
    }

    isResponseOk(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }

    signup = (event) => {
        event.preventDefault();

        if(this.state.username == "" || this.state.password == "" || this.state.rePassword == ""){
            this.setState({error: "Username or password is blank"});
            return;
        }

        if(this.state.rePassword != this.state.password){
            this.setState({error: "Password entries don't match"});
            return;
        }

        this.setState({error: ""});

        fetch("http://localhost:8000/api/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": this.state.csrf,
            },
            credentials: "include",
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
        })
        .then(this.isResponseOk)
        .then((data) => {
            console.log(data);
            this.setState({isAuthenticated: false, username: "", password: "", error: ""});
            alert("Successfully signup");
            location.reload();
        })
        .catch((err) => {
            console.log(err);
            this.setState({error: "Username already exist"});
        });
    }

    login = (event) => {
        event.preventDefault();

        if(this.state.username == "" || this.state.password == ""){
            this.setState({error: "Username or password is blank"});
            return;
        }

        fetch("http://localhost:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": this.state.csrf,
            },
            credentials: "include",
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
        })
        .then(this.isResponseOk)
        .then((data) => {
            console.log(data);
            this.getCSRF();
            this.setState({isAuthenticated: true, usernameCertified: this.state.username});
        })
        .catch((err) => {
            console.log(err);
            this.setState({error: "Wrong username or password"});
        });
    }

    logout = () => {
        fetch("http://localhost:8000/api/logout", {
            credentials: "include",
        })
        .then(this.isResponseOk)
        .then((data) => {
            console.log(data);
            this.setState({isAuthenticated: false, username: "", password: "", error: ""});
            this.getCSRF();
        })
        .catch((err) => {
            console.log(err);
        });
    };

    render(){
        return <>
            <Navbar />

            {!this.state.isAuthenticated ? <Login setUsername={this.setUsername}
                                                 setPassword={this.setPassword}
                                                 setRePassword={this.setRePassword}
                                                 login={this.login}
                                                 signup={this.signup}
                                                 error={this.state.error}
                                                 setError={this.setError}
                                           />
                                         :
                                           <Profile username={this.state.usernameCertified}
                                                   logout={this.logout}
                                                   csrf={this.state.csrf}
                                           />
            }
        </>
    }
}

export default Main;