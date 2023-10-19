import React, {useEffect, useState} from 'react';
import Avatar, {getAvatar} from "../../components/Avatar.tsx";
import {io} from "socket.io-client";

type User = {
    id?: string
    name: string,
    avatar: string,
    appId: string
}

const initialUser = {
    id: '',
    name: '',
    avatar: '',
    appId: '',
}

const ChatApp = () => {

    // const [messages, setMessages] = useState<string[]>([]);
    const [connectedUsers, setConnectedUsers] = useState<User[]>([]);

    const [currentUser, setUser] = useState<User>(initialUser);
    const [inputValue, setInputValue] = useState('');

    const [error, setError] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const socket = io('http://localhost:8080');

    // useEffect(() => {
    //     socket.on('message', (message) => {
    //         setMessages((prevMessages: string[]) => [...prevMessages, message]);
    //     });
    // }, []);

    useEffect(() => {
        socket.on('user connected', (payload: User[]) => setConnectedUsers(payload));
    }, [currentUser])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue) {
            setError(true);
        } else {
            enterChannel()
        }
    };

    const enterChannel = () => {

        const newUser = {
            appId: Math.random().toString(),
            name: inputValue,
            avatar: getAvatar(inputValue)
        }

        setIsConnected(true);
        setUser(newUser);
        setInputValue('');

        socket.emit('user connected', {...newUser});
    }

    const renderConnections = () => {
        return connectedUsers.map((user: User) => (
            <div key={user.id}>
                {user.appId === currentUser.appId ? (
                    'You have joined the conversation'
                ) : (
                    <>
                        <span className="user-name">{user.name} has joined the conversation</span>
                        <span className="avatar" style={{background: getAvatar(user.name), backgroundSize: 'contain'}}/>
                    </>
                )}
            </div>
        ));
    }

    const renderWelcomeMessage = () => {
        if (!connectedUsers) return null;

        return (
            <li className="welcome-message">
                <hr/>
                <div className="welcome-message-text">
                    {renderConnections()}
                </div>
            </li>
        );
    };

    return (
        <div className="container">

            {!isConnected && <h1>Join the conversation</h1>}

            <ul className="feed">
                {isConnected && renderWelcomeMessage()}
                {/*{messages.map((message, index) => (*/}
                {/*    <li key={index}>{message}</li>*/}
                {/*))}*/}
            </ul>

            <form className="messaging-form" action="#" onSubmit={onSubmit}>
                <span className="feedback"></span>

                <div className={`message-input ${error && 'error'}`}>
                   <Avatar name={currentUser.name}/>
                    <input
                        type="text"
                        className="message-input-field name-input"
                        placeholder={isConnected ? 'Send a message for the channel...' : "Your name"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                </div>

                {!isConnected && <button className="join" type="submit">Join</button>}

            </form>
        </div>
    );
}

export default ChatApp;
