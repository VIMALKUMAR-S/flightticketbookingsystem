import React from 'react'
import axios from '../api/axios'
import { toast } from 'react-toastify'
import InputButton from './InputButton'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { curidState } from '../atom/atoms'

const Table = ({ flights = [], role = {} }) => {


    const [curid, setCuid] = useRecoilState(curidState)
    const navigate = useNavigate()
    const handleDelete = (id) => {
        axios.get(
            `deleteFlight?id=${id}`,
            {
                headers: { 'Authorization': "Bearer " + localStorage.getItem('jwt') }
            }
        ).then((res) => {
            toast.success("Deleted flight")
        })
    }
    const toTime = (str) => {
        const date = new Date(str);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        const formattedDateTime = `${formattedDate} ${formattedTime}`;
        return formattedDateTime
    }
    return (
        <table className="flight-table">
            <thead>
                <tr>
                    <th>Flight Name</th>
                    <th>Starting Location</th>
                    <th>Destination</th>
                    <th>Departure Time</th>
                    <th>Landing Time</th>
                    <th>Ticket Cost</th>
                    <th>Total Seats</th>
                    <th>Available Seats</th>
                    {
                        role === "USER" && <th>UserControl</th>
                    }

                    {
                        role === "ADMIN" && <th>Admin Control</th>
                    }
                </tr>
            </thead>
            <tbody>
                {flights.map((flight) => (



                    (<tr key={flight.flightName}>
                        <td>{flight.flightName}</td>
                        <td>{flight.startingLocation}</td>
                        <td>{flight.destination}</td>
                        <td>{toTime(flight.departureTime)}</td>
                        <td>{toTime(flight.landingTime)}</td>
                        <td>Rs.{flight.ticketCost}</td>
                        <td>{flight.totalSeats}</td>
                        <td>{flight.availableSeats}</td>
                        {role === "USER" &&
                            <td><InputButton flight={flight} /></td>}


                        {role === "ADMIN" &&


                            <td><button style={{ "backgroundColor": "red" }}
                                onClick={() => handleDelete(flight.id)}
                            >Delete</button>
                                {/* <button style={{ "backgroundColor": "red" }}
                                    onClick={() => {

                                        console.log(flight)
                                        setCuid(flight.id)
                                        navigate("../adminview")

                                    }}
                                >View</button> */}

                            </td>}
                    </tr>)
                ))}
            </tbody>
        </table>
    )
}

export default Table