import React, { useState, useEffect } from 'react';
import Edit from './Edit';
import Delete from './Delete';

export default function SingleVacation({ vacation, setvacations, vacations }) {

    const [edit, setEdit] = useState(false);
    const [deleteVacation, setDeleteVacation] = useState(false);

    const [fromDate, setfromDate] = useState(vacation.fronDate)
    const [toDate, settoDate] = useState(vacation.toDate);
    const [following, setfollowing] = useState(false);  


    useEffect(() => {

        fetch(`http://localhost:1000/vacations/isFollowing/${vacation.id}`, {
            method: 'get',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setfollowing(data.following));


        settoDate(new Date(vacation.toDate).toLocaleDateString('en-IL'));
        setfromDate(new Date(vacation.fronDate).toLocaleDateString('en-IL'));


    }, [vacations]);

    const follow = async () => {
        const res = await fetch(`http://localhost:1000/vacations/follow/${vacation.id}`, {
            method: 'put',
            credentials: 'include'
        });
        const data = await res.json();

        if (data.length) {
            setvacations(data);
        }
        else {
            alert(data.err);
        }
    }


    return (
        <div className="vacation">
            <div>
                <img src={vacation.imgUrl} alt="img" />
            </div>
            <div className="info-div">
                <h1>{vacation.destination}</h1>
                <h3>{vacation.description}</h3>
                <h3>{vacation.price}$</h3>
                <p>leaves: {fromDate}</p>
                <p>returns: {toDate}</p>
                <p>followers :{vacation.followers}</p>

                {
                    localStorage.role === "user" && <button onClick={follow} className="like-button">{following ? "❤" : "♡"}</button>
                }

                {
                    localStorage.role === "admin" &&
                    <div>
                        <button onClick={() => {
                            setEdit(true);
                        }
                        }>✏</button>
                        <button onClick={() => {
                            setDeleteVacation(true);
                        }}>✖</button>
                    </div>

                }

            </div>

            {
                edit && <Edit vacation={vacation} setEdit={setEdit} setvacations={setvacations} />
            }
            {
                deleteVacation && <Delete setDeleteVacation={setDeleteVacation} setvacations={setvacations} id={vacation.id} />
            }

        </div>
    )
}
