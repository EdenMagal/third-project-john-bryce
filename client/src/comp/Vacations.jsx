import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Add from './Add';
import Header from './Header';
import Search from './Search';
import SingleVacation from './SingleVacation';

export default function Vacations() {

    const history = useHistory();

    const [vacations, setvacations] = useState([]);
    const [add, setAdd] = useState(false);
    const [search, setsearch] = useState(false);

    useEffect(() => {

        if (!localStorage.username) {
            return history.push('/');
        }

        fetch('http://localhost:1000/vacations/', {
            credentials: 'include',
            method: 'get'
        })
            .then(res => res.json())
            .then(data => setvacations(data))
    }, []);

    return (
        <div className="vacation-list">
            
            <Header />

            <div className="search-btn">
                <button onClick={() => {
                    setsearch(true);
                }}>🔍</button>
            </div>

            {localStorage.role === "admin" &&
                <div className="admin-buttons">
                    <button onClick={() => {
                        setAdd(true);
                    }}>➕</button>
                    <button onClick={() => {
                        history.push('/reports');
                    }}>📊</button>
                </div>
            }
            {vacations.map(vac => <SingleVacation vacations={vacations} setvacations={setvacations} vacation={vac} />)}

            {
                add && <Add setAdd={setAdd} setvacations={setvacations} />
            }
            {
                search && <Search setsearch={setsearch} vacations={vacations} setvacations={setvacations} />
            }

        </div>
    )
}
