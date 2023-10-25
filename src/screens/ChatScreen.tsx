import { FormEvent, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import Avatar from '../components/Avatar.tsx';
import './styles/ChatScreen.css';

interface Message {
    text: string;
    senderId: string;
    senderName: string;
    timestamp: number;
}

const socket: Socket = io('http://localhost:8080');

const ChatScreen = () => {
    const userInfo = useAppSelector((state) => state.auth.userInfo);

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    useEffect(() => {
        if (userInfo) {
            socket.emit('user connected', userInfo);
            const timestamp = Date.now();
            const welcomeMessage = 'You have joined the conversation';
            setMessages([
                {
                    text: welcomeMessage,
                    senderId: 'system',
                    senderName: 'System',
                    timestamp: timestamp,
                },
            ]);
        }
    }, [userInfo]);

    useEffect(() => {
        const handleReceiveMessage = (message: Message) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { ...message, timestamp: Date.now() },
            ]);
        };
        socket.on('message', handleReceiveMessage);

        return () => {
            socket.off('message', handleReceiveMessage);
        };
    }, [socket]);

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;
        if (!userInfo) return;

        const timestamp = Date.now();
        const newMessage: Message = {
            text: inputMessage,
            senderId: userInfo.id,
            senderName: userInfo.name,
            timestamp: timestamp,
        };

        socket.emit('message', newMessage);
        setInputMessage('');
    };

    const messageSender = (message: Message) => {
        if (userInfo) {
            return message.senderId === userInfo.id ? 'user' : 'remoteUser';
        }
        return 'remoteUser';
    };

    return (
        <div className="chat-page">
            <div className="chat-app">
                <div className="message-feed">
                    {messages.map((message, index) => (
                        <div className="message-wrapper" key={index}>
                            {message.senderId !== 'system' && (
                                <>
                                    <Avatar name={message.senderName} />
                                    <div className={`message ${messageSender(message)}`}>
                                        {message.text}
                                    </div>
                                </>
                            )}
                            {message.senderId === 'system' && (
                                <div className="welcome-message">
                                    <span>{message.text}</span>
                                </div>
                            )}
                            {message.senderId !== 'system' && (
                                <span className="message-timestamp">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage}>
                    <div className="message-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatScreen;
