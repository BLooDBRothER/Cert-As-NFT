import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/User';
import Header from '../../components/Header';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SecurityIcon from '@mui/icons-material/Security';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Divider } from '@mui/material';
import { axiosGetProfile } from '../../apis/endpoint';

const listItems = [
    {
        icon: <CorporateFareIcon className='text-accent' />,
        text: "Personal",
        path: "personal",
        subText: "Your Personal Details",
    },
    {
        icon: <ImportContactsIcon className='text-accent' />,
        text: "Courses",
        path: "course",
        subText: "Courses Available",
    },
    {
        icon: <SecurityIcon className='text-accent' />,
        text: "Security",
        path: "security",
        subText: "Secure Your Account",
    },
]

const Profile = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const match = useMatches();
    
    const [selectedItem, setSelectedItem] = useState(match[1].handle.idx);
    const [data, setData] = useState({
        organization_name: '',
        organization_logo: '',
      });

    useEffect(() => {
        setSelectedItem(match[1].handle.idx);
    }, [match]);

    async function getProfile(){
        const res = await axiosGetProfile();
        console.log(res);
        setData(prev => ({...prev, ...res.data}))
    }

    useEffect(() => {
        getProfile();
      }, []);

    // useEffect(() => {
    //     if(!user.isLoggedIn) return;
    //     navigate('/');
    // }, [user.isLoggedIn])

    return (
        <>
            <Header showWallet />
            <div className='p-2 w-[80vw] mx-auto sidebar-wrap'>
                <div>
                    <div>
                        {data.organization_logo && 
                        <Box className='w-[100px] h-[100px] mx-auto'>
                            <img src={`http://localhost:5000/logo/${data.organization_logo}`} className='aspect-square rounded-full border' />
                        </Box>}
                        <p className='text-center text-lg my-2'>{data.organization_name}</p>
                    </div>
                    <Divider />
                    <List>
                        {listItems.map((item, idx) => (
                            <ListItem key={item.text} className={`border-transparent border-l-2 ${idx === selectedItem && '!border-primary'}`} sx={{
                                '& .MuiButtonBase-root:hover': {
                                    backgroundColor: '#7d7d7d1f'
                                }
                            }} onClick={() => setSelectedItem(idx)} disablePadding>
                                <Link to={item.path} className='w-full'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <div className='ml-4 mx-2'>
                    <h2 className='text-2xl pt-3'>{listItems[selectedItem].text}</h2>
                    <div>
                        <div className=' opacity-70'>{listItems[selectedItem].subText}</div>
                        <div className=' min-h-[calc(100vh-240px)] bg-secondary-lg p-4 my-2 rounded-lg text-2xl '>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
