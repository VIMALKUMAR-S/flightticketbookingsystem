import React, { useEffect, useState } from 'react'
import '../styles/Home.scss';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { filterState } from '../atom/atoms';
import Table from '../components/Table';
import { useNavigate } from 'react-router-dom';
const Filter = () => {

    const [flightNames, setFlightNames] = useState([])
    const [flights, setFlights] = useState([])
    const [filter, setFilter] = useRecoilState(filterState)
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [token] = useState(localStorage.getItem('jwt'))
    const navigate = useNavigate()

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
    const handleInputChange = (e) => {

        const { name, value } = e.target
        setFilter(
            {
                ...filter,
                [name]: value
            }

        )
    }
    const toTime = (str) => {
        const date = new Date(str);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        const formattedDateTime = `${formattedDate} ${formattedTime}`;
        return formattedDateTime
    }
    useEffect(() => {
        axios.get(
            'flightName'
        ).then((res) => {
            setFlightNames(res.data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setFlights([])
        axios.post(
            'filtering-BY-All',
            filter

        ).then((res) => {
            setFlights(res.data)
        })


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

            <section className='form-wrapper'>
                <div className="form_addfield">
                    <select name="flightName" value={filter.flightName} className='select' onChange={handleInputChange}>
                        <option value=''>Flights</option>
                        {
                            flightNames.map(keyword => (
                                <option value={keyword} key={keyword}>
                                    {keyword}
                                </option>
                            ))
                        }
                    </select>
                    <input type='datetime-local'
                        title='Departure Time'
                        onChange={(e) => {
                            const date = new Date(e.target.value);
                            const isoString = date.toISOString();
                            setFilter(
                                {
                                    ...filter,
                                    ["departureTime"]: isoString

                                }
                            )

                        }} />
                    <input
                        type='text'
                        value={filter.destination}
                        placeholder='Destination'
                        name='destination'
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        value={filter.startingLocation}
                        placeholder='Starting Location'
                        name='startingLocation'
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSubmit}>
                        Filter
                    </button>

                </div>

            </section>


            <Table role={role} flights={flights} />
        </section>
    )
}

export default Filter
