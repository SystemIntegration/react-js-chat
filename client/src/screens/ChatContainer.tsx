import { useEffect, useRef, useState } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReceiver, { ChatBoxSender } from './ChatBox.tsx';
import InputText from './InputText.tsx';
import UserLogin from './UserLogin.tsx';
import db from './firebase.ts'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Button } from 'antd';
import ScrollToBottom, { useScrollToEnd } from 'react-scroll-to-bottom';

export default function ChatContainer() {

    let socket = socketIOClient("http://192.168.10.144:5001")
    const [chats, setChats] = useState<any[]>([]);
    const [user, setUser] = useState(localStorage.getItem("user"))
    const hours: any = new Date().getHours() > 9 ? new Date().getHours() : "0" + new Date().getHours();
    const minutes: any = new Date().getMinutes() > 9 ? new Date().getMinutes() : "0" + new Date().getMinutes();

    useEffect(() => {
        // Method for show chats in web.
        socket.on('chat', senderChats => {
            setChats(senderChats)
        })
    })

    // Method for send chats to socket server
    function sendChatToSocket(chat: any) {
        socket.emit("chat", chat)
    }

    // Method for get data from firebase, when page refresh.
    const fetchPost = async () => {
        await getDocs(collection(db, "chats"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data() }));
                setChats(newData.map(data => data.chats).sort((a, b) => {
                    return a.date - b.date
                }))
            })
    }

    useEffect(() => {
        fetchPost();
    }, [])

    // Method for set data in firebase and web when user type enter button
    async function addMessage(chat: object) {
        const newChat = { ...chat, user: localStorage.getItem("user"), date: new Date().getTime(), time: hours + ":" + minutes }
        try {
            const docRef = await addDoc(collection(db, "chats"), {
                chats: newChat,
            });
            // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setChats([...chats, newChat])
        sendChatToSocket([...chats, newChat])
    }

    // Method for user logout
    function logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("avatar")
        setUser("")
    }

    // Method for scroll down automation
    useScrollToEnd();

    // Method for show whole chats on the web
    function ChatsList() {
        return (<div style={{ height: '80vh' }}>
            {
                chats.map((chat, index) => {
                    if (chat.user === user) return <ChatBoxSender key={index} message={chat.message} user={chat.user} time={chat.time} />
                    return <ChatBoxReceiver key={index} message={chat.message} user={chat.user} time={chat.time} />
                })
            }
        </div>)

    }

    return (
        <div>
            {
                user ?
                    <div>
                        <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', margin: '0 1rem', alignItems: 'center' }}>
                            <h4> Welcome {user}</h4>
                            <Button onClick={() => logout()} style={{ color: "blue", cursor: 'pointer' }} >Log Out</Button>
                        </div>
                        <ScrollToBottom mode='bottom' initialScrollBehavior='auto'>
                            <ChatsList
                            />
                        </ScrollToBottom>
                        <InputText addMessage={addMessage} />
                    </div>
                    : <UserLogin setUser={setUser} />
            }
        </div>
    )
}

