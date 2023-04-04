import React from 'react'
import { useState, useContext } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig'
import TokenContext from '../../TokenContext';
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';

const DeleteButton = ({win}) => {
  const [message, setMessage] = useState("")
  const { token } = useContext(TokenContext)
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home")
  }

  const handleDelete = async (id) => {
    try {
      const response = await api({
        method: "DELETE",
        url: `/wins/${id}`,
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
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
    <Button color='delete' variant='outlined' sx={{cursor: "pointer"}} onClick={() => handleDelete(win.id)}>Delete</Button>
  )
}

export default DeleteButton