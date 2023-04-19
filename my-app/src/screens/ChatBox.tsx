import React from 'react'
import { Avatar } from '@mui/material';

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

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
}

interface ChatBoxReciverProps {
    user: string;
    message: string;
    time: string;
}
interface ChatBoxSenderProps {
    user: string;
    message: string;
    time: string;
}

export default function ChatBoxReciver({ user, message,time
}: ChatBoxReciverProps): JSX.Element {
    return (
        <div
            style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row" }
            }
        >
            <Avatar style={{ width: 34, height: 34, margin: "0 0.5rem" }} {...stringAvatar(user)} />
            <p style={{ padding: 10, backgroundColor: "#2B333B", borderRadius: 10, maxWidth: "60%" }}>
                <strong style={{ fontSize: 13 }}> {user},{time} </strong>
                <p style={{ margin: "0.5rem 0 0 0" }}> {message} </p>
            </p>
        </div>
    );
}

export function ChatBoxSender({ user, message,time
}: ChatBoxSenderProps): JSX.Element {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }
        }
        >
            <p style={{ padding: 10, backgroundColor: "#2B333B", borderRadius: 10, maxWidth: '60%' }}>
                <strong style={{ fontSize: 13 }}> {user},{time} </strong>
                < p style={{ margin: '0.5rem 0 0 0' }}> {message} </p>
            </p>
            < Avatar style={{ width: 34, height: 34, margin: '0 0.5rem' }} {...stringAvatar(user)} />
        </div>
    )
}
