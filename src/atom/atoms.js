import { atom } from "recoil";

export const tokenState = atom({
    key: "tokenState",
    default: {
        jwt: "",
        refresh: ""
    }
})
export const roleState = atom({
    key: "roleState",
    default: {
        role: ""
    }
})
export const flightState = atom(
    {
        key: "flightState",
        default: {
            "id": null,
            "flightName": "",
            "startingLocation": "",
            "destination": "",
            "departureTime": "",
            "landingTime": "",
            "ticketCost": null,
            "totalSeats": null,
            "availableSeats": null
        }
    }
)
export const filterState = atom(
    {
        key: "filterState",
        default: {
            "flightName": null,
            "startingLocation": null,
            "destination": null,
            "departureTime": null
        }
    }
)
export const addState = atom(
    {
        key: "filterState",
        default: {
            "flightId": null,
            "ticketCounts": null,
            "bookingCost": null
        }

    }
)
export const curidState = atom(
    {
        key: "curidState",
        default: {
            "flightId": null,

        }
    }
)