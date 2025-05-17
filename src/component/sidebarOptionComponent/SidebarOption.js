import React from 'react';
import './SidebarOption.css';
import { useNavigate } from 'react-router-dom';
// import { db } from '../../firebase';
// import { collection, addDoc } from 'firebase/firestore';

function SidebarOption({ Icon, title, id, addChannelOption, onClick }) {
    const navigate = useNavigate();

    const selectChannel = () => {
        if (addChannelOption) {
            onClick?.(); // trigger modal
        } else if (id) {
            navigate(`/room/${id}`);
        } else {
            navigate(`/${title}`);
        }
    };

    return (
        <div className="sidebarOption" onClick={selectChannel}>
            {Icon && <Icon className="sidebarOption__icon" />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                <h3 className="sidebarOption__channel">
                    <span className="sidebarOption__hash">#</span> {title}
                </h3>
            )}
        </div>
    );
}

export default SidebarOption;