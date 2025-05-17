import { useState } from 'react';
import './ChatInput.css';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState('')
    const [{ user }] = useStateValue();

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!channelId) return;
        if (!input.trim()) return;

        if (!channelId || typeof channelId !== 'string') {
            console.error('Invalid channelId:', channelId);
            return;
        }

        try {
            await addDoc(
                collection(db, 'rooms', channelId, 'messages'),
                {
                    message: input,
                    timestamp: serverTimestamp(),
                    user: user.displayName,
                    userImage: user.photoURL,
                }
            );
            setInput('');
        } catch (err) {
            console.error('Error sending message:', err);
        }
    }

    return (
        <div className='chatInput'>
            <form onSubmit={sendMessage}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`}
                    autoFocus
                />
                <button type='submit'>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput
