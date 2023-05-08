import React, { useState } from 'react';
import { addState } from '../atom/atoms';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import axios from '../api/axios';

function InputButton({ flight = {} }) {
    const [showInput, setShowInput] = useState(false);
    const [add, setAdd] = useRecoilState(addState)

    const handleSubmit = (e) => {
        // e.preventDefault();
        // console.log(flight)
        axios.post(
            'addBooking',
            add,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            }
        ).then((res) => {
            toast.success(res.data)
        })
        // console.log(inputValue);
        setShowInput(false);
    };

    return (
        <div>
            {!showInput && (
                <button onClick={() => setShowInput(true)}>Book</button>
            )}
            {showInput && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name='ticketCounts'
                        value={add.ticketCounts}
                        placeholder='Enter Ticket count'
                        onChange={(e) => {

                            setAdd({
                                ["flightId"]: flight.id,
                                ["ticketCounts"]: e.target.value,
                                ['bookingCost']: e.target.value * flight.ticketCost


                            })

                        }}
                    />
                    <p>Price:Rs.{add.bookingCost}</p>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setShowInput(false)}>
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}
export default InputButton