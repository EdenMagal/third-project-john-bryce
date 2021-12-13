import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useHistory } from 'react-router-dom'
import Header from './Header';

export default function Reports() {

    Chart.register(...registerables);

    const history = useHistory();

    const [vacations, setvacations] = useState([]);
    const [message, setMessage] = useState("");


    const getReports = async () => {

        const res = await fetch('http://localhost:1000/admin/reports', {
            credentials: 'include'
        });

        const data = await res.json();

        if (!data.err) {
            if (data.msg) {
                return setMessage(data.msg);
            }

            setvacations(data);
        }
        else {
            history.push('/vacations');
        }
    }

    useEffect(() => {

        if (localStorage.role !== "admin") {
            return history.push('/vacations');
        }

        getReports();

    }, []);

    return (
        <div className="reports">

            <Header />

            <div className="admin-buttons">

                <button onClick={() => {
                    history.push('/vacations');
                }}>✈</button>

            </div>

            <div>
                {
                    vacations.length ?
                        <Bar
                            height={500}
                            width={700}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: {
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }
                                }
                            }}
                            data={{
                                labels: vacations.map(vacation => { return vacation.destination }),
                                datasets: [{
                                    label: '# of followers',
                                    data: vacations.map(vacation => { return vacation.followers }),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1,
                                }]
                            }}
                        /> :
                        <p>{message}</p>
                }
            </div>


        </div>
    )
}
