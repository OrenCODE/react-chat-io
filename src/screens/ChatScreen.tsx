import {FormEvent, useEffect, useState} from 'react';
import {useAppSelector} from '../hooks/useAppSelector.ts';
import {io, Socket} from 'socket.io-client';
import ChatFeed, {Message} from "../components/ChatFeed.tsx";
import Avatar from "../components/Avatar.tsx";
import './styles/ChatScreen.css';

type Connections = {
    socketId: string
    userId: string
    name: string
}

const socket: Socket = io('http://localhost:8080');

const ChatScreen = () => {
    const userInfo = useAppSelector((state) => state.auth.userInfo);

    const [connectedUsers, setConnectedUsers] = useState<Connections[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    const [inputMessage, setInputMessage] = useState<string>('');
    // const [recording, setRecording] = useState(false);
    // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    useEffect(() => {
        if (userInfo) {
            socket.emit('user connected', userInfo);
            const timestamp = Date.now();
            const welcomeMessage = 'You have joined the conversation';
            setMessages([
                {
                    type: 'text',
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
                message,
            ]);
        };
        socket.on('message', handleReceiveMessage);

        socket.on('user connected', (users) => {
            setConnectedUsers(users);
        });

        socket.on('user disconnect', (users) => {
            setConnectedUsers(users);
        });

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
            type: 'text',
            text: inputMessage,
            senderId: userInfo.id,
            senderName: userInfo.name,
            timestamp: timestamp,
        };

        socket.emit('message', newMessage);
        setInputMessage('');
    };

    // const handleRecordVoice = () => {
    //     if (!userInfo) return;
    //     if (recording) {
    //         mediaRecorder?.stop();
    //         setRecording(false);
    //     } else {
    //         navigator.mediaDevices
    //             .getUserMedia({audio: true})
    //             .then((stream) => {
    //                 const recorder = new MediaRecorder(stream);
    //                 recorder.ondataavailable = (e) => {
    //                     if (e.data.size > 0) {
    //                         const timestamp = Date.now();
    //                         const newMessage: Message = {
    //                             type: 'voice',
    //                             voiceData: new Blob([e.data], {type: 'audio/wav'}),
    //                             senderId: userInfo.id,
    //                             senderName: userInfo.name,
    //                             timestamp: timestamp,
    //                         };
    //                         setMessages((prevMessages) => [...prevMessages, newMessage]);
    //                         socket.emit('voiceMessage', e.data);
    //                     }
    //                 };
    //                 recorder.onstop = () => {
    //                     stream.getTracks().forEach((track) => track.stop());
    //                 };
    //                 recorder.start();
    //                 setMediaRecorder(recorder);
    //                 setRecording(true);
    //             })
    //             .catch((error) => {
    //                 console.error('Error accessing microphone:', error);
    //             });
    //     }
    // };

    if (!userInfo) return;

    return (
        <div className="chat-page">
            <div className="chat-app">
                <ChatFeed messages={messages} userInfo={userInfo}/>
                <form onSubmit={handleSendMessage}>
                    <div className="message-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button type="submit">Send</button>
                        {/*<button type="button" onClick={handleRecordVoice}*/}
                        {/*        className={recording ? 'record-button stop-record' : 'record-button'}>*/}
                        {/*    {recording ? 'Stop' : 'Record'}*/}
                        {/*</button>*/}
                    </div>
                </form>
            </div>
            <div className="connected-users">
                <h3 className="connections-title">Connected</h3>
                <ul>
                    {connectedUsers.map((connection) => (
                        <div key={connection.userId} className="connection">
                            <Avatar name={connection.name}/>
                            <div key={connection.userId}>{connection.name}</div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatScreen;
