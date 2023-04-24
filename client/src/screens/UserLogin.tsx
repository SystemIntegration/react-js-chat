import React, { useState } from 'react'
import _ from 'lodash'

// Variable for set styles for button.
const button = {
    width: '10%',
    height: 50,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#075e54',
    borderWidth: 0,
    color: '#fff',
    margin: 10
}

interface UserLoginProps {
    setUser: any;
}

// Method for user login page
export default function UserLogin({ setUser
}: UserLoginProps): JSX.Element {

    const [user, setAUser] = useState("")

    // Method for set user value (Name) in chat app.
    function handleSetUser() {
        if (!user) return
        localStorage.setItem("user", user)
        setUser(user)
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: 0 }}>Welcome to BMV Chat </h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input
                    style={{ margin: 10, height: 30, width: '25%', borderRadius: 10, borderWidth: 10, fontSize: 15, paddingInline: 5 }}
                    value={user}
                    onChange={e => setAUser(e.target.value)}
                    placeholder="Write your User Name"
                ></input>
                <button
                    onClick={() => handleSetUser()}
                    style={button}
                >
                    Login
                </button>

            </div>

        </div>
    )
}