import React from 'react'
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig'

const DeleteIconButton = ({win}) => {
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
    <DeleteForeverIcon sx={{cursor: "pointer"}} onClick={() => handleDelete(win._id.$oid)} />
  )
}

export default DeleteIconButton