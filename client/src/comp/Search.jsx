import React, { useState } from 'react'
import SingleVacation from './SingleVacation';

export default function Search({ setsearch, setvacations, vacations }) {

    const [destination, setDestination] = useState("");
    const [vacation, setvacation] = useState([]);
    const [searched, setsearched] = useState(false);

    const searchVacation = async () => {

        const res = await fetch(`http://localhost:1000/vacations/search/${destination}`, {
            method: 'get',
            credentials: 'include'
        });

        const data = await res.json();

        if (!data.err) {
            setvacation(data);
            setsearched(false);
        }
        else {
            setsearched(true);
        }

    }

    return (

        <div className="edit">

            <button className="exit" onClick={() => {
                setsearch(false);
            }}>✖</button>

            <div className="search">

                <input type="text" value={destination} placeholder="destination" onChange={e => {
                    setDestination(e.target.value);
                }} />
                <button onClick={searchVacation}>🔍</button>
                <button onClick={() => {
                    setDestination("");
                    setvacation([]);
                }}>clear</button>

            </div>

            <div className="scroll">
                {
                    vacation.map(vac => <SingleVacation vacations={vacations} vacation={vac} setvacations={setvacations} />)
                }
            </div>

            {
                searched && "sorry, no vacations available to this destination. Try again some other time!"
            }

        </div >
    )
}
