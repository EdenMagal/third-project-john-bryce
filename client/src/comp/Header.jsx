import React, { useState } from 'react';
import { useHistory } from 'react-router';


export default function Header() {

    const history = useHistory();



    const logout = async () => {
        try {
            const res = await fetch('http://localhost:1000/users/logout', {
                method: 'delete',
                credentials: 'include'
            });

            const data = await res.json();

            if (data.msg) {
                history.push('/');
                localStorage.removeItem('username');
                localStorage.removeItem('role');
            }
            else {
                alert(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="header">

            <h3>Hello {localStorage.username ? localStorage.username : "Guest"}</h3>

            <div>
                <button onClick={logout}>logout</button>
            </div>

            
        </div>
    )
}
