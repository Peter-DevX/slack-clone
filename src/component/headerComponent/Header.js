import React from 'react'
import './Header.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useStateValue } from '../../StateProvider';


function Header() {
    const [{ user }] = useStateValue();
    return (
        <div className='header'>
            <div className='header__left'>
                <AccountCircleIcon
                    className='header__avatar'
                    alt={user?.displayName}
                    src={user?.photoURL} />
                <AccessTimeIcon />
            </div>

            <div className='header__search'>
                {/* search icon */}
                <SearchIcon />
                {/* input */}
                <input placeholder='search DevX Solutions'/>
            </div>

            <div className='header__right'>
                {/* help icon */}
                <HelpOutlineIcon />
            </div>
        </div>
    )
}

export default Header
