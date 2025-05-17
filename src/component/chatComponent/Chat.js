import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import './Chat.css';
import { db } from '../../firebase';
import { collection, onSnapshot, doc, query, orderBy } from 'firebase/firestore';
import Message from '../messageComponent/Message';
import ChatInput from '../chatInputComponent/ChatInput'


function Chat() {
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [messages, setMessages] = useState([]);

    console.log(messages)

    useEffect(() => {
        if (!roomId) return;

        const roomRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(db, 'rooms', roomId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
            if (snapshot.exists()) {
                setRoomDetails(snapshot.data());
            } else {
                setRoomDetails(null);
            }
        });

        const unsubscribeMessages = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs?.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        })

        return () => {
            unsubscribeRoom();
            unsubscribeMessages()
        };


    }, [roomId])

    console.log(roomDetails);

    return (
        <div className='chat'>
            <div className='chat__header'>
                <div className='chat__headerLeft'>
                    <h4 className='chat__channelName'>
                        <span>#{roomDetails?.name}</span>
                        <StarBorderIcon />
                    </h4>
                </div>

                <div className='chat__headerRight'>
                    <p>
                        <InfoOutlineIcon />Details
                    </p>
                </div>
            </div>

            <div className='chat__message'>
                { messages.map(({name, message, timestamp, user, userImage, fileUrl, fileName}, idx) => (
                    <Message 
                        key={idx}
                        name={name}
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage}
                        fileUrl={fileUrl}
                        fileName={fileName}
                    />
                ))}
            </div>

            <ChatInput channelName={roomDetails?.name} channelId={roomId}/>
        </div>
    )
}

export default Chat
