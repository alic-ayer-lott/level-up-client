import userEvent from "@testing-library/user-event"
import React, { useEffect, useState } from "react"
import { getProfile } from "./ProfileManager.js"


export const Profile = () => {
    const [profile, changeProfile] = useState({})

    useEffect(() => {
        getProfile().then(data => changeProfile(data))
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: {profile?.gamer?.user?.first_name} {profile?.gamer?.user?.last_name}
                </div>
                <div className="profile__username">
                    Username: {profile?.gamer?.user?.username}
                </div>
                {/* TODO: show the user's bio */}
                <div className="profile__bio">
                    About you: {profile?.gamer?.bio}
                </div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events you are attending</h3>
                    {
                        profile?.attending?.map( (event) => {
                            return <section> {event.game.title} on {event.date} at {event.time} </section>
                        })
                    }
                </header>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events you are hosting</h3>
                    {
                        profile?.hosting?.map((event) => {
                            return <section> {event?.game?.title} on {event.date} at {event.time} </section>
                        })
                    }
                </header>
                <div className="registrations">
                    {/* TODO: Map through the events the user is hosting */}
                </div>
            </section>
        </article>
    )
}
