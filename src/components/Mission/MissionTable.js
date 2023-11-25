import React from 'react';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "100%",
}));

const MissionTable = ({ missions }) => {
  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>미션 제목</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell>성취율</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missions.map((mission) => (
            <TableRow key={mission.mission_id}>
              <TableCell>{mission.title}</TableCell>
              <TableCell>{mission.category}</TableCell>
              <TableCell>{mission.achievementRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default MissionTable;
