import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createGame, getGameTypes, getGame, updateGameFetch } from "./GameManager.js"

export const GameForm = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes()
            .then((data) => setGameTypes(data))
    }, [])

    useEffect(() => {
        if (gameId) {
            getGame(gameId).then((gameData) => setCurrentGame(
                {
                    ...gameData,
                    skillLevel: gameData.skill_level,
                    numberOfPlayers: gameData.number_of_players,
                    gameTypeId: gameData.game_type.id
                }))
        }
    }, [gameId])

    const controlInputChange = (event) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    const saveGame = (event) => {
        event.preventDefault()

        createGame(currentGame).then(() => {
            history.push('/games')
        })
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" value={currentGame.title} required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={controlInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" value={currentGame.maker} required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={controlInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" value={currentGame.gameTypeId} className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={controlInputChange}>

                        <option value="0">Select a game type</option>
                        {
                            gameTypes.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" value={currentGame.numberOfPlayers} required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={controlInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" value={currentGame.skillLevel} required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={controlInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={event => {
                    event.preventDefault()
                    if (gameId) {
                        updateGameFetch(currentGame)
                            .then(() => history.push("/games"))
                    } else {
                        saveGame(event)
                    }
                }}
                className="btn btn-primary">Save Game</button>
        </form>
    )
}