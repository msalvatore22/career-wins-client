import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../api/axiosConfig';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import WinContext from '../../WinContext';


export default function WinDetail() {
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
  },)

  return (
    <div style={{display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center", marginTop: "30px"}}>
      <Card variant="outlined" sx={{ maxWidth: 800 }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {selectedWin?.title}
            <Typography sx={{ml: 2}} variant="caption" display="inline-block" gutterBottom>
              {selectedWin?.yearMonth}
            </Typography>
          </Typography>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
            <Typography variant="caption" display="block" gutterBottom>
               Description
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
               Impact
            </Typography>
          </div>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
          <Typography sx={{mr: 1}} variant="body1" color="text.secondary">
            {selectedWin?.description}
          </Typography>
          <Divider orientation="vertical" flexItem></Divider>
          <Typography sx={{ml: 1}} variant="body1" color="text.secondary">
            {selectedWin?.impact}
          </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </div>
  );
}