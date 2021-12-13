import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


export default function Login() {

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

        if (localStorage.username) {
            history.push('/vacations');
        }

    }, [])


    const login = async () => {

        const res = await fetch('http://localhost:1000/users/login', {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await res.json();

        if (data.user) {
            localStorage.username = data.user.username;
            localStorage.role = data.user.role;
            history.push('/vacations');
        }
        else {
            alert(data.err);
        }
    }

    return (

        <div className="l-r">
          
            <h1>Login!</h1>
          
            <input type="text" placeholder="username" onChange={e => {
                setUsername(e.target.value);
            }} />
          
            <input type="password" placeholder="password" onChange={e => {
                setPassword(e.target.value);
            }} />
          
            <a href="/register">Don't have a user ? Register !</a>
          
            <button onClick={login} disabled={[username, password].includes("")}>LOG IN</button>
       
        </div>
    )
}
