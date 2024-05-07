import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Room, User } from "../../types/heartWithMeInterfaces";

const MainPageHearWithMe: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
    const [participants, setParticipants] = useState<User[]>([]);
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');

    const socket = io('http://localhost:3001');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server via Socket.IO');
            socket.emit('getRooms');
        });

        socket.on('roomsList', (rooms) => {
            setRooms(rooms);
        });

        socket.on('roomsListUpdated', () => {
            socket.emit('getRooms');
        });

        socket.on('updateParticipants', (users) => {
            setParticipants(users);
        });

        return () => {
            socket.off('connect');
            socket.off('roomsList');
            socket.off('roomsListUpdated');
            socket.off('updateParticipants');
        };
    }, [socket]);

    useEffect(() => {
        if (currentRoom) {
            socket.on('updateParticipants', (users) => {
                setParticipants(users);
            });

            return () => {
                socket.off('updateParticipants');
            };
        }
    }, [socket, currentRoom]);

    const handleCreateRoom = () => {
        if (!roomName || !username) {
            alert("Please enter your name and a room name.");
            return;
        }
        socket.emit('createRoom', { roomName, username });
    };

    const handleJoinRoom = (roomId: string) => {
        if (!username) {
            alert("Please enter your name before joining a room.");
            return;
        }
        socket.emit('joinRoom', { roomId, username });
        const room = rooms.find(room => room.id === roomId);
        setCurrentRoom(room || null);
    };

    const handleLeaveRoom = () => {
        if (!currentRoom || !username) {
            alert("Error: Not currently in any room or username not set.");
            return;
        }
        socket.emit('leaveRoom', { roomId: currentRoom.id, username });
        setCurrentRoom(null);
        setParticipants([]);
    };

    return (
        <div>
            {!currentRoom && (
                <>
                    <h1>Available Rooms</h1>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Room name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                    <button onClick={handleCreateRoom}>Create Room</button>
                    <ul>
                        {rooms.map(room => (
                            <li key={room.id}>
                                {room.name}
                                <button onClick={() => handleJoinRoom(room.id)}>Join Room</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {currentRoom && (
                <div>
                    <h2>Room: {currentRoom.name}</h2>
                    <h3>Participants:</h3>
                    <ul>
                        {participants.map(user => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                    <button onClick={handleLeaveRoom}>Leave Room</button>
                </div>
            )}
        </div>
    );
};

export default MainPageHearWithMe;
