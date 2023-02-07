import React from 'react'
import Button from '../../components/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { axiosUpdateStatus } from '../../data/axios';

const ActionButton = ({data}) => {

    const handleClick = async (type) => {
        console.log(type, data);
        data.status = type;
        const bodyData = {
          status: type,
          id: data.id
        }
        const res = await axiosUpdateStatus(bodyData);
        console.log(res);
    }

  return (
    <div className='flex  gap-2 items-center justify-center'>
        <Button handleCss='!p-0 approve-btn' handleClick={handleClick.bind(null, 'verified')}><CheckCircleIcon /></Button>
        <Button handleCss='!p-0 reject-btn' handleClick={handleClick.bind(null, 'rejected')}><CancelIcon /></Button>
    </div>
  )
}

export default ActionButton
