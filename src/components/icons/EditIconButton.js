import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const EditIconButton = ({win}) => {
  let navigate = useNavigate();

  const handleNavigate = id => {
    navigate(`/wins/edit/${id}`)
  }
  return (
    <EditIcon sx={{cursor: "pointer"}} onClick={() => handleNavigate(win._id.$oid)} />
  )
}

export default EditIconButton