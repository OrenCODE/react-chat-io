import React, {useEffect, useState} from 'react';
import Avatar from "./Avatar.tsx";
import {Socket} from "socket.io-client";

interface User {
    id: string;
    name: string;
}

type OnlineUsersProps = {
    socket: Socket
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({socket}) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        socket.emit('get online users');
        socket.on('user connected', (newUsers: User[]) => {
            setUsers(newUsers);
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <div className="online-users">
            <h2>Online Users</h2>
            <div className="user-avatars">
                {users.map((user) => (
                    <div>
                        <span>{user.name}</span>
                        <Avatar key={user.id} name={user.name}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OnlineUsers;
