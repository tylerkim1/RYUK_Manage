import React, { useState } from 'react';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { List, ListItem } from '@mui/material';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "100%",
}));

const MissionTable = ({ missions }) => {
  const [openRow, setOpenRow] = useState(null);

  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '60%', fontSize: '17px', fontWeight: '800' }}>미션 제목</TableCell>
            <TableCell style={{ width: '30%', fontSize: '17px', fontWeight: '800' }}>카테고리</TableCell>
            <TableCell style={{ width: '10%', fontSize: '17px', fontWeight: '800' }}>성취율</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missions.map((mission) => (
            <>
              <TableRow key={mission.mission_id} onClick={() => setOpenRow(openRow === mission.mission_id ? null : mission.mission_id)}>
                <TableCell>{mission.title}</TableCell>
                <TableCell>{mission.category}</TableCell>
                <TableCell>{mission.achievementRate}</TableCell>
              </TableRow>
              {openRow === mission.mission_id && (
                <TableRow>
                  {mission.users ? mission.users.map((user) => (
                    <List>
                      <ListItem id="menu-mission-table-user-list-item">
                        {user.user_id} {user.is_success === 1 ? "미달" : ""}
                      </ListItem>
                    </List>
                  )) : ''}
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default MissionTable;
