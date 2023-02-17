import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import WinContext from '../../WinContext';

const WinList = () => {
  const { wins, setSelectedWin } = useContext(WinContext)
  let navigate = useNavigate();

  const handleWinSelect = id => {
    navigate(`/wins/${id}`)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Year Month</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Highlight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wins?.map((win) => (
            <TableRow
              key={win._id.$oid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleWinSelect(win._id.$oid)}
            >
              <TableCell align="left">{win.yearMonth}</TableCell>
              <TableCell align="left">{win.title}</TableCell>
              <TableCell align="left">{win.description}</TableCell>
              <TableCell align="left">{win.favorite.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WinList;
