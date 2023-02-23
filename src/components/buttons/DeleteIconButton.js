import React from 'react'
import { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig'

const DeleteButton = ({win}) => {
  const [message, setMessage] = useState("")
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/")
  }

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`wins/${id}`)
      if (response.status === 204) {
        setMessage("Win deleted successfully");
      } else {
        setMessage("Some error occured");
      }
      console.log(message)
      setMessage("")
      handleNavigate()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Button color='delete' variant='outlined' sx={{cursor: "pointer"}} onClick={() => handleDelete(win._id.$oid)}>Delete</Button>
  )
}

export default DeleteButton