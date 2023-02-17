import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../api/axiosConfig';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WinContext from '../../WinContext';


export default function MediaCard({win}) {
  const { id } = useParams();
  const { selectedWin, setSelectedWin } = useContext(
    WinContext
  );

  useEffect(() => {
    const getWinById = async () => {
      try {
        const res = await api.get(`/wins/${id}`);
        setSelectedWin(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getWinById()
  }, [])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {selectedWin?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedWin?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}