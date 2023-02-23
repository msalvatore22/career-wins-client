import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../api/axiosConfig';
import { Card, CardActions, CardContent, Typography, Divider, CircularProgress, Grid, Box } from "@mui/material";
import EditIconButton from '../../components/buttons/EditIconButton'
import DeleteButton from '../../components/buttons/DeleteIconButton'

export default function WinDetail() {
  const { id } = useParams();
  const [selectedWin, setSelectedWin] = useState();

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
  }, [id])

  if(selectedWin){
    return (
      <div style={{display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center", marginTop: "30px"}}>
        <Card variant="outlined" sx={{ maxWidth: 800 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {selectedWin.title}
              <Typography sx={{ml: 2}} variant="caption" display="inline-block" gutterBottom>
                {selectedWin.yearMonth}
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
            <Grid container>
              <Grid item xs>
              <Typography sx={{mr: 1}} variant="body1" color="text.secondary">
                {selectedWin.description}
              </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
              <Grid item xs>
              <Typography sx={{ml: 1}} variant="body1" color="text.secondary">
                {selectedWin.impact}
              </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing sx={{display: "flex", justifyContent: "flex-end"}}>
            <EditIconButton win={selectedWin} />
            <DeleteButton win={selectedWin} />
          </CardActions>
        </Card>
      </div>
    );
  } else {
    return (
      <div style={{display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center", marginTop: "30px"}}>
        <CircularProgress color="secondary" />
      </div>
    )
  }

}