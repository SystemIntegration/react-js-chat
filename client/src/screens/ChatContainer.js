import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import UserLogin from './UserLogin';
import db from './firebase.js'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Button } from 'antd';

export default function ChatContainer() {

    let socketio = socketIOClient("http://192.168.10.144:5001")
    const [chats, setChats] = useState([])
    const [user, setUser] = useState(localStorage.getItem("user"))
    const avatar = localStorage.getItem('avatar')

    useEffect(() => {
        socketio.on('chat', senderChats => {
            setChats(senderChats)
        })
    })

    function sendChatToSocket(chat) {
        socketio.emit("chat", chat)
    }



    const fetchPost = async () => {

        await getDocs(collection(db, "chats"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data() }));
                // console.log(newData.map(data => data.todo).sort((a, b) => {
                //     const aTime = new Date(`2000-01-01T${a.date}`);
                //     const bTime = new Date(`2000-01-01T${b.date}`);
                //     return aTime - bTime;
                // }));
                setChats(newData.map(data => data.chats).sort((a, b) => {
                    const aTime = new Date(`2000-01-01T${a.date}`);
                    const bTime = new Date(`2000-01-01T${b.date}`);
                    return aTime - bTime;
                }))
            })
    }
    useEffect(() => {
        fetchPost();
    }, [])



    async function addMessage(chat) {
        const newChat = { ...chat, user: localStorage.getItem("user"), avatar, date: new Date().toLocaleTimeString() }
        try {
            const docRef = await addDoc(collection(db, "chats"), {
                chats: newChat,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setChats([...chats, newChat])
        sendChatToSocket([...chats, newChat])
    }

    function logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("avatar")
        setUser("")
    }

    function ChatsList() {
        return (<div style={{ height: '75vh', overflowX: 'hidden'}}>
            {
                chats.map((chat, index) => {
                    if (chat.user === user) return <ChatBoxSender key={index} message={chat.message} user={chat.user} />
                    return <ChatBoxReciever key={index} message={chat.message} user={chat.user} />
                })
            }
        </div>)

    }

    return (
        <div>
            {
                user ?
                    <div>
                        <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between',margin:'0 1rem',alignItems:'center' }} >
                            <h4> Welcome {user}</h4>
                            <Button onClick={() => logout()} style={{ color: "blue", cursor: 'pointer' }} >Log Out</Button>
                        </div>
                        <ChatsList
                        />
                        <InputText addMessage={addMessage} />
                    </div>
                    : <UserLogin setUser={setUser} />
            }
        </div>
    )
}