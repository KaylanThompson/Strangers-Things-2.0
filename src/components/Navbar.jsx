import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

const Navbar = ({ userToken, setUserToken }) => {
    const navigate = useNavigate()

    async function logIn(event) {
        event.preventDefault()
        try {
            const userToLogin = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user: {
                        username: event.target[0].value,
                        password: event.target[1].value
                    }
                })
            }
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/users/login",
                userToLogin
            )
            const result = await response.json()
            const token = result.data.token
            setUserToken(token)
            localStorage.removeItem("token")
            localStorage.setItem("token", token)
            navigate('/')
        } catch (error) {
            console.log("there is an error", error)
        }
    }

    return (
        <div id="navbar">
            <div id="site-name">
                <h1>Stranger's Things</h1>
            </div>
            {userToken ? (
                <div className="button-div">
                    <NavLink className="nav-link" to="/post" value="Sell Things">
                        <button>Sell Things</button>
                    </NavLink>
                    <NavLink className="nav-link" to="/dashboard">
                        <button>User Profile</button>
                    </NavLink>

                    <button
                        className="nav-link"
                        onClick={() => {
                            setUserToken(null)
                            localStorage.removeItem("token")
                            navigate("/")
                        }}>
                        Log Out
                    </button>
                    <NavLink className="nav-link" to="/postsDisplay">
                        <button>Things For Sale</button>
                    </NavLink>
                    <NavLink className="nav-link" to="/">
                        <button>Home</button>
                    </NavLink>
                </div>
            ) : (
                <>
                    <form className="login-form" onSubmit={logIn}>
                        <label htmlFor="username-input">
                            Username:
                            <input type="text" name="username-input" />
                        </label>
                        <label htmlFor="password-input">
                            Password:
                            <input type="password" name="password-input" />
                        </label>
                        <input id="login" className="nav-link" type="submit" value="Log In" />
                    </form>
                    <div className="always-buttons">
                        <NavLink className="nav-link" to="/register">
                            <button>Sign Up</button>
                        </NavLink>
                        <NavLink className="nav-link" to="/postsDisplay">
                            <button>Things For Sale</button>
                        </NavLink>
                        <NavLink className="nav-link" to="/">
                            <button>Home</button>
                        </NavLink>
                    </div>
                </>
            )}
        </div>
    )
}

export default Navbar
