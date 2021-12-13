import React, { useState } from 'react';


export default function Edit({ vacation, setEdit, setvacations }) {


    const [destination, setDestination] = useState(vacation.destination);
    const [description, setDescription] = useState(vacation.description);
    const [price, setPrice] = useState(vacation.price);
    const [fronDate, setfronDate] = useState(new Date(vacation.fronDate).toLocaleDateString('en-IL').split("/").reverse().join("-"));
    const [toDate, setToDate] = useState(new Date(vacation.toDate).toLocaleDateString('en-IL').split("/").reverse().join("-"));
    const [imgUrl, setImgUrl] = useState(vacation.imgUrl);



    const updateChanges = async () => {

        const res = await fetch(`http://localhost:1000/admin/edit/${vacation.id}`, {
            method: 'put',
            credentials: 'include',
            body: JSON.stringify({ description, destination, price, fronDate, toDate, imgUrl }),
            headers: {
                'content-type': 'application/json'
            }
        });

        const data = await res.json();

        if (!data.err) {
            setvacations(data);
            setEdit(false);
        }
        else {
            alert(data.err);
        }
    }


    return (

        <div className="edit">

            <div>
  
                <button className="exit" onClick={() => {
                    setEdit(false);
                }}>✖</button>

            </div>

            <h1>Edit vacation to {vacation.destination}</h1>

            <input type="text" placeholder="destination" value={destination} onChange={e => {
                setDestination(e.target.value);
            }} />

            <input type="text" placeholder="description" value={description} onChange={e => {
                setDescription(e.target.value);
            }} />

            <input type="number" placeholder="price" value={price} onChange={e => {
                setPrice(e.target.value);
            }} />

            <input type="date"  value={fronDate} onChange={e => {
                setfronDate(e.target.value);
            }} />

            <input type="date"  value={toDate} onChange={e => {
                setToDate(e.target.value);
            }} />

            <input type="text" placeholder="img url" value={imgUrl} onChange={e => {
                setImgUrl(e.target.value);
            }} />

            <button onClick={updateChanges} disabled={[description, destination, fronDate, toDate, imgUrl, price].includes("")}>Update changes</button>

        </div>
    )
}
