import React from 'react'

export default function Delete({ id, setDeleteVacation, setvacations }) {

    const deleteThisVacation = async () => {

        const res = await fetch(`http://localhost:1000/admin/delete/${id}`, {
            method: 'delete',
            credentials: 'include'
        });

        const data = await res.json();

        if (data.length) {
            setvacations(data);
            setDeleteVacation(false);
        }
        else {
            alert(data.err);
        }
    }

    return (

        <div className="edit">
        
            <h3>Are you sure you want to delete this vacation?</h3>
        
            <div>
        
                <button onClick={deleteThisVacation}>YES</button>
        
                <button onClick={() => {
                    setDeleteVacation(false);
                }}>NO</button>
        
            </div>
        
        </div>
    )
}
