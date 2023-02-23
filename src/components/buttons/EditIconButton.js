import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditIconButton = ({win}) => {
  let navigate = useNavigate();

  const handleNavigate = id => {
    navigate(`/wins/edit/${id}`)
  }
  return (
    <Button color='secondary' variant='outlined' sx={{cursor: "pointer", mr: 1}} onClick={() => handleNavigate(win._id.$oid)}>Edit</Button>
  )
}

export default EditIconButton