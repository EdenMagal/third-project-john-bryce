import React, { useState } from 'react';

export default function Add({ setAdd, setvacations }) {

    const [destination, setDestination] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [fronDate, setfronDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [imgUrl, setImgUrl] = useState("");


    const addVacation = async () => {

        const res = await fetch('http://localhost:1000/admin/add', {
            method: 'put',
            credentials: 'include',
            body: JSON.stringify({ description, destination, price, imgUrl, fronDate, toDate }),
            headers: {
                'content-type': 'application/json'
            }
        });

        const data = await res.json();

        if (!data.err) {
            setAdd(false);
            setvacations(data);
        }
        else {
            alert(data.err);
        }
    }

    return (
        <div className="edit">

            <button className="exit" onClick={() => {
                setAdd(false);
            }}>✖</button>

            <h1>Add a new vacation</h1>

            <input type="text" placeholder="destination" onChange={e => {
                setDestination(e.target.value);
            }} />

            <input type="text" placeholder="description" onChange={e => {
                setDescription(e.target.value);
            }} />

            <input type="number" placeholder="price" onChange={e => {
                setPrice(e.target.value);
            }} />
            
            <input type="date" placeholder="from date:" onChange={e => {
                setfronDate(e.target.value);
            }} />
            
            <input type="date" placeholder="return date:" onChange={e => {
                setToDate(e.target.value);
            }} />
            
            <input type="text" placeholder="img url" onChange={e => {
                setImgUrl(e.target.value);
            }} />
            
            <button onClick={addVacation} disabled={[description, destination, fronDate, toDate, imgUrl, price].includes("")}>Add vacation</button>
        
        </div>
    )
}
