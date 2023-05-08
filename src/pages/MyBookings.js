import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MyBookings = () => {

    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {

        axios.post(
            'userBooking',
            {},
            {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('jwt')
                }
            }
        ).then((res) => {
            console.log(res)
            setData(res.data)
        })
    }, [])
    const toTime = (str) => {
        const date = new Date(str);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        const formattedDateTime = `${formattedDate} ${formattedTime}`;
        return formattedDateTime
    }
    return (
        <>
            <section className='navbar-wrapper'>
                <button onClick={() => { navigate('../home') }}>Home</button>
                <button onClick={() => { navigate('../filter') }}>Filter</button>
                <button onClick={() => {

                    axios.post(
                        'logout',
                        {

                        },
                        {
                            headers: { 'Authorization': "Bearer " + localStorage.getItem('jwt') }
                        }

                    ).then((res) => {
                        localStorage.setItem('jwt', '')
                        navigate('../')
                        toast.success(res.data)
                    })

                }}>Log out</button>
            </section>
            <table className="flight-table">
                <thead>
                    <tr>
                        <th>Flight Name</th>
                        <th>Starting Location</th>
                        <th>Destination</th>
                        <th>Departure Time</th>
                        <th>Landing Time</th>
                        <th>
                            Ticket Count
                        </th>
                        <th>
                            Booking Cost
                        </th>



                    </tr>
                </thead>
                <tbody>
                    {data.map((flight) => (
                        <tr key={flight.id}>
                            <td>{flight.flightName}</td>
                            <td>{flight.startingLocation}</td>
                            <td>{flight.destination}</td>
                            <td>{toTime(flight.departureTime)}</td>
                            <td>{toTime(flight.landingTime)}</td>
                            <td>{flight.ticketCounts}</td>
                            <td>Rs.{flight.bookingCost}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default MyBookings