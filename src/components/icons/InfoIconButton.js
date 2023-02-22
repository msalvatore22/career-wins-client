import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const InfoIconButton = ({win}) => {
  let navigate = useNavigate();

  const handleNavigate = id => {
    navigate(`/wins/${id}`)
  }

  return (
    <InfoIcon sx={{cursor: "pointer"}} onClick={() => handleNavigate(win._id.$oid)} />
  )
}

export default InfoIconButton