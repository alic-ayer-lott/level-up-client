import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createEvent, getEvents, getGames } from "./EventManager.js"


export const EventForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    const [currentEvent, setEvent] = useState({
        gameId: 1,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        getGameTypes()
        .then((data) => setGameTypes(data))
    }, [])

    const changeEventState = (event) => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
        // TODO: Complete the onChange function
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                                    {game.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // TODO: Call the createEvent function and pass it the event object


                    // TODO: Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
