import React, { useEffect, useState } from 'react';
import '../styles/Home.scss';
import axios from '../api/axios';
import { useRecoilState } from 'recoil';
import { addState, flightState, roleState, tokenState } from '../atom/atoms';
import { toast } from 'react-toastify';
import ReactModal from 'react-modal';
import InputButton from '../components/InputButton';
import Table from '../components/Table';
import { useNavigate } from 'react-router-dom';



const Home = () => {



    const [flights, setFlights] = useState([])
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [token] = useState(localStorage.getItem('jwt'))
    const [flight, setFlight] = useRecoilState(flightState)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/everyFlight').then((res) => {
            setFlights(res.data)
        })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFlight({
            ...flight,
            [name]: value
        })
    }

    const handleAddItem = (e) => {

        axios.post(
            'addFlight',
            flight,
            {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('jwt')
                }
            }
        ).then((res) => {
            toast.success("Added successfully")
        })
    }
    const handleDelete = (id) => {
        axios.get(
            `deleteFlight?id=${id}`,
            {
                headers: { 'Authorization': "Bearer " + token }
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
        <section>

            <section className='navbar-wrapper'>
                <button onClick={() => { navigate('../mybookings') }}>My Bookings</button>
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
            {
                role === "ADMIN" ? <form onSubmit={handleAddItem} className='form_addfield'>
                    <input
                        id='input_field'
                        type='text'
                        name='flightName'
                        placeholder='ENTER FLIGHT NAME'
                        autoComplete='off'
                        value={flight.flightName}
                        onChange={(e) => { handleInputChange(e) }}
                        required

                    />
                    <input
                        id='input_field'
                        type='text'
                        name='startingLocation'
                        placeholder='ENTER STARTING LOCATION'
                        onChange={(e) => { handleInputChange(e) }}
                        value={flight.startingLocation}
                        required
                    />
                    <input
                        id='input_field'
                        type='text'
                        name='destination'
                        placeholder='ENTER DESTINATION'
                        onChange={(e) => { handleInputChange(e) }}
                        value={flight.destination}
                        required
                    />
                    <input
                        id='input_field'
                        type='datetime-local'

                        name='departureTime'
                        title='ENTER DEPARTURE TIME'
                        onChange={(e) => {

                            const date = new Date(e.target.value);
                            const isoString = date.toISOString();
                            setFlight(
                                {
                                    ...flight,
                                    [e.target.name]: isoString
                                }
                            )
                        }}
                        // value={flight.departureTime}
                        required
                    />
                    <input
                        id='input_field'
                        type='datetime-local'
                        name='landingTime'
                        title='ENTER LANDING TIME'
                        onChange={(e) => {
                            const date = new Date(e.target.value);
                            const isoString = date.toISOString();
                            setFlight(
                                {
                                    ...flight,
                                    [e.target.name]: isoString
                                }
                            )
                        }}
                        // value={flight.landingTime}
                        required
                    />
                    <input
                        id='input_field'
                        type='text'
                        name='ticketCost'
                        placeholder='ENTER COST OF TICKET'
                        onChange={(e) => { handleInputChange(e) }}
                        value={flight.ticketCost}
                        required
                    />
                    <input
                        id='input_field'
                        type='number'
                        name='totalSeats'
                        placeholder='ENTER TOTAL SEATS'
                        onChange={(e) => { handleInputChange(e) }}
                        value={flight.totalSeats}
                        required
                    />
                    <input
                        id='input_field'
                        type='number'
                        name='availableSeats'
                        placeholder='ENTER AVAILABLE SEATS'
                        onChange={(e) => { handleInputChange(e) }}
                        value={flight.availableSeats}
                        required
                    />




                    <button type='submit' id='button__add'>ADD</button>
                    <br></br>
                </form> : <></>
            }
            <Table flights={flights} role={role} />
        </section>
    );
};

export default Home;
