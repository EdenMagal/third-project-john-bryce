import React, { useState } from 'react';
import { useHistory } from 'react-router';

export default function Register() {

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const register = async () => {

        const res = await fetch('http://localhost:1000/users/register', {
            method: 'post',
            body: JSON.stringify({ firstName, lastName, username, password }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await res.json();

        if (data.msg) {
            history.push('/');
        }
        else {
            alert(data.err);
        }
    }

    return (

        <div className="l-r">
        
            <h1>Register!</h1>
        
            <input type="text" placeholder="first name" onChange={e => {
                setFirstName(e.target.value);
            }} />
        
            <input type="text" placeholder="last name" onChange={e => {
                setLastName(e.target.value);
            }} />
        
            <input type="text" placeholder="username" onChange={e => {
                setUsername(e.target.value);
            }} />
        
            <input type="password" placeholder="password" onChange={e => {
                setPassword(e.target.value);
            }} />
        
            <a href="/">already have a user ? Login !</a>
        
            <button onClick={register} disabled={[firstName, lastName, username, password].includes("")}>Register</button>
        
        </div>
    )
}
