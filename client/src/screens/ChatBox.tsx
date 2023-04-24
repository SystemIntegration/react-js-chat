import React from 'react'
import { Avatar } from '@mui/material';

// Method for avatar name to color
function stringToColor(string: string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
}

// Method for made avatar
function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0].toLocaleUpperCase()}${name.split(' ')[0][1].toLocaleUpperCase()}`,
    };
}

interface ChatBoxReceiverProps {
    user: string;
    message: string;
    time: string;
}
interface ChatBoxSenderProps {
    user: string;
    message: string;
    time: string;
}

// Method for show user chats
export default function ChatBoxReceiver({ user, message,time
}: ChatBoxReceiverProps): JSX.Element {
    return (
        <div
            style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row" }
            }
        >
            <Avatar style={{ width: 40, height: 40, margin: "0 0.5rem" }} {...stringAvatar(user)} />
            <p style={{ padding: 10, backgroundColor: "#2B333B", borderRadius: 10, maxWidth: "60%" }}>
                <strong style={{ fontSize: 13 }}> {user},</strong>{time}
                <p style={{ margin: "0.5rem 0 0 0" }}> {message} </p>
            </p>
        </div>
    );
}

// Method for show opposite side user chats
export function ChatBoxSender({ user, message,time
}: ChatBoxSenderProps): JSX.Element {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }
        }
        >
            <p style={{ padding: 10, backgroundColor: "#2B333B", borderRadius: 10, maxWidth: '60%' }}>
                <strong style={{ fontSize: 13 }}> {user},</strong>{time}
                < p style={{ margin: '0.5rem 0 0 0' }}> {message} </p>
            </p>
            < Avatar style={{ width: 40, height: 40, margin: '0 0.5rem' }} {...stringAvatar(user)} />
        </div>
    )
}
