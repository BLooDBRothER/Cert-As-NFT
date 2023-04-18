import React from 'react'
import Button from './Button';
import metamaskIc from '../assets/metamask-icon.svg'
import Avatar from '@mui/material/Avatar';
import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../context/User';
import { Menu, MenuItem } from '@mui/material';
import { useNFT } from '../context/NFT';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name[0]}`,
    };
}
const Header = ({ showWallet = false }) => {
    const { user, logout } = useUser();

    const {web3Handler, account, logoutMetaMask} = useNFT();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className='bg-secondary text-primary flex justify-between items-center p-4 h-[80px] border-b'>
            <NavLink to="/"><h1>YOUR CERTIFICATE</h1></NavLink>
            <div className='flex items-center justify-center gap-3'>
                {user.isLoggedIn && account.address && <Link to='/mint' className=' text-accent hover:text-primary mx-1 text-xl nav-link'>Mint</Link>}
                {/* {user.isLoggedIn && account.address && <Link to='/mint' className=' text-accent hover:text-primary mx-1 text-xl'>Mint</Link>} */}
                {showWallet && (account.address ? <Button onClick={logoutMetaMask} handleCss=" text-ellipsis w-[200px] whitespace-nowrap overflow-hidden">{account.address}</Button> : <Button handleCss='flex items-center' onClick={web3Handler}>Connect Wallet <span><img className='mx-2' width={25} src={metamaskIc} /></span></Button>)}
                {user.isLoggedIn &&
                    <>
                        <Avatar {...stringAvatar(user.email)} aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            className="hover:cursor-pointer"
                            onClick={handleClick} />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                className: 'mt-2'
                            }}
                            MenuListProps={{
                                className: 'bg-secondary-lg text-primary',
                                'aria-labelledby': 'basic-button',
                            }}
                            
                        >
                            <MenuItem className='hover:!bg-primary hover:!text-secondary' onClick={handleClose}><Link to='/setting/personal'>Setting</Link></MenuItem>
                            <MenuItem className='hover:!bg-primary hover:!text-secondary' onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </>
                }
            </div>
        </header>
    )
}

export default Header
