import React, { useEffect, useState, useContext } from 'react';
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
import TokenContext from '../../TokenContext';
import { Typography } from '@mui/material';

const WinList = () => {
  const [wins, setWins] = useState();
  const { token } = useContext(TokenContext)

  useEffect(() => {
    const getWins = async () => {
      try {
        const response = await api({
          method: "GET",
          url: "/user",
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        setWins(response.data.user.wins)
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
          <Typography variant='h5'>
            My Wins
          </Typography>
        </TableHead>
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
              key={win.id}
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
