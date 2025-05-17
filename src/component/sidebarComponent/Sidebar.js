import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarOption from '../sidebarOptionComponent/SidebarOption';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import DraftsIcon from '@mui/icons-material/Drafts';
import FacebookIcon from '@mui/icons-material/Facebook';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import { db } from '../../firebase'; // correct path to your firebase config
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { useStateValue } from '../../StateProvider';

function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [showOptions, setShowOptions] = useState(true); // for show less/more
    const [{ user }] = useStateValue();

    const handleAddChannel = async () => {
        if (!channelName.trim()) return;

        try {
            await addDoc(collection(db, 'rooms'), {
                name: channelName.trim(),
            });
            setShowModal(false);
            setChannelName('');
        } catch (err) {
            console.error('Error adding channel:', err);
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                }))
            );
        });
        return () => unsubscribe(); // cleanup listener on unmount
    }, []);

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <div className='sidebar__info'>
                    <h2>DevX Solutions</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user?.displayName}
                    </h3>
                </div>
                <CreateIcon />
            </div>

            <div className={`sidebar__options-group${showOptions ? '' : ' hide'}`}>
                <SidebarOption Icon={CommentIcon} title="Threads" />
                <SidebarOption Icon={YouTubeIcon} title="Youtube" />
                <SidebarOption Icon={InstagramIcon} title="Instagram" />
                <SidebarOption Icon={DraftsIcon} title="Important" />
                <SidebarOption Icon={FacebookIcon} title="Facebook" />
                <SidebarOption Icon={PeopleAltIcon} title="The New Force" />
            </div>
            <SidebarOption
                Icon={showOptions ? ExpandLessIcon : ExpandMoreIcon}
                title={showOptions ? "Show less" : "Show more"}
                onClick={() => setShowOptions((prev) => !prev)}
                className="show-toggle"
            />
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <SidebarOption Icon={AddIcon} addChannelOption onClick={() => setShowModal(true)} title="Add Channel" />
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Add a New Channel</h2>
                        <input
                            type="text"
                            placeholder="Channel name"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleAddChannel}>Add</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dynamic channel list from Firestore */}
            {channels.map(({ id, name }) => (
                <SidebarOption key={id} title={name} id={id} />
            ))}
        </div>
    );
}

export default Sidebar;
