import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createEvent, getGames, getEvent, updateEventFetch } from "./EventManager.js"


export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const { eventId } = useParams()

    const [currentEvent, setEvent] = useState({
        // gameId: 1,
        // description: "",
        // date: "",
        // time: ""
    })

    useEffect(() => {
        getGames()
        .then((data) => setGames(data))
    }, [])

    const changeEventState = (event) => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
        // TODO: Complete the onChange function
    }

    useEffect(() => {
        if (eventId) {
            getEvent(eventId).then((eventData) => setEvent(
                {
                    ...eventData,
                    gameId: eventData.game.id,
                    description: eventData.description,
                    date: eventData.date,
                    time: eventData.time
                }
            ))
        }
    }, [eventId])

    const saveEvent = (event) => {
        event.preventDefault()

        createEvent(currentEvent).then(() => {
            history.push('/events')
        })
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" value={currentEvent.gameId} className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option>Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                                    {game.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" value={currentEvent.description} required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={ changeEventState }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={ changeEventState }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={ changeEventState }
                    />
                </div>
            </fieldset>

            {/* TODO: Create the rest of the input fields */}

            <button type="submit"
                onClick={event => {
                    event.preventDefault()
                    if (eventId) {
                        updateEventFetch(currentEvent)
                            .then(() => history.push("/events"))
                    } else {
                        saveEvent(event)
                    }
                    // TODO: Call the createEvent function and pass it the event object


                    // TODO: Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
