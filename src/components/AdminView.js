import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { curidState } from '../atom/atoms'
import axios from '../api/axios'

const AdminView = () => {

    const [curid, setCuid] = useRecoilState(curidState)
    const [data, setdata] = useState([])
    useEffect(() => {
        axios.post(`flightBooking?flightId=${curid.id}`,
            {},
            {
                headers: { 'Authorization': "Bearer " + localStorage.getItem('jwt') }
            }

        ).then((res) => {
            setdata(res.data)
        })
    }, [])
    return (
        <table className="flight-table">
            <thead>
                <tr>
                    <th>Flight Name</th>
                    <th>Ticket Cost</th>
                    <th>Ticket Count</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((datum) => (
                        <tr>
                            <td>
                                {datum.flightId}
                            </td>
                            <td>
                                {datum.bookingCost}
                            </td>
                            <td>
                                {datum.ticketCount}
                            </td>


                        </tr>

                    ))
                }
            </tbody>
        </table>
    )
}

export default AdminView