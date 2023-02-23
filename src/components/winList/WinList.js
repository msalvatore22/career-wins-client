import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GradeIcon from '@mui/icons-material/Grade';
import InfoIconButton from '../icons/InfoIconButton';


const WinList = () => {
  const [wins, setWins] = useState();

  useEffect(() => {
    const getWins = async () => {
      try {
        const response = await api.get("/wins")
        setWins(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getWins()
  }, [])

  return (
    <TableContainer sx={{ minWidth: 640, maxWidth: 1200, display: 'flex', justifyContent: "center" }}  component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="center">Favorite</TableCell>
            <TableCell align="center">Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wins?.map((win) => (
            <TableRow
              key={win._id.$oid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{win.winDate}</TableCell>
              <TableCell align="left">{win.title}</TableCell>
              <TableCell align="center">{win.favorite ? <GradeIcon color='secondary' /> : ""}</TableCell>
              <TableCell align="center"><InfoIconButton win={win} /></TableCell>
            </TableRow>     
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WinList;
