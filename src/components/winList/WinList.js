import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import WinContext from '../../WinContext';
import GradeIcon from '@mui/icons-material/Grade';
import EditIconButton from '../icons/EditIconButton';
import InfoIconButton from '../icons/InfoIconButton';
import DeleteIconButton from '../icons/DeleteIconButton';

const WinList = () => {
  const { wins } = useContext(WinContext)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Year Month</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="center">Favorite</TableCell>
            <TableCell align="center">Info</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wins?.map((win) => (
            <TableRow
              key={win._id.$oid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{win.yearMonth}</TableCell>
              <TableCell align="left">{win.title}</TableCell>
              
              <TableCell align="center">{win.favorite ? <GradeIcon color='favorite' /> : ""}</TableCell>
              <TableCell align="center"><InfoIconButton win={win} /></TableCell>
              <TableCell align="center"><EditIconButton win={win} /></TableCell>
              <TableCell align="center"><DeleteIconButton win={win} /></TableCell>
            </TableRow>     
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WinList;
