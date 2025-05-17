import React from 'react';
import './SidebarOption.css';
import { useNavigate } from 'react-router-dom';
// import { db } from '../../firebase';
// import { collection, addDoc } from 'firebase/firestore';

function SidebarOption({ Icon, title, id, addChannelOption, onClick, className }) {
    const navigate = useNavigate();

    const selectChannel = () => {
        if (onClick) {
            onClick();
            return;
        }
        if (addChannelOption) {
            onClick?.(); // trigger modal
        } else if (id) {
            navigate(`/room/${id}`);
        } else {
            navigate(`/${title}`);
        }
    };

    return (
        <div className={`sidebarOption${className ? ' ' + className : ''}`} onClick={selectChannel}>
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