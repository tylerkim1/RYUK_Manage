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
          <TableRow style={{height: '50px', backgroundColor: '#f7f7f7'}}>
            <TableCell style={{ width: '60%', color: '#a1a1a1', fontSize: '13px' }}>미션 제목</TableCell>
            <TableCell style={{ width: '30%', color: '#a1a1a1', fontSize: '13px' }}>카테고리</TableCell>
            <TableCell style={{ width: '10%', color: '#a1a1a1', fontSize: '13px' }}>성취율</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missions.map((mission) => (
            <>
              <TableRow key={mission.mission_id} style={{height: '70px', cursor: 'pointer'}} onClick={() => setOpenRow(openRow === mission.mission_id ? null : mission.mission_id)}>
                <TableCell style={{ fontSize: '15px', fontWeight: '700' }}>{mission.title}</TableCell>
                <TableCell style={{ fontSize: '15px', fontWeight: '700' }}>{mission.category}</TableCell>
                <TableCell style={{ fontSize: '15px', fontWeight: '700' }}>{mission.achievementRate}</TableCell>
              </TableRow>

              <TableRow id="menu-mission-table-user-row">
                {openRow === mission.mission_id && (
                  <TableCell colSpan={3}>
                    <List id="menu-mission-table-user-list">
                      <div id="menu-mission-table-user-list-header">
                        <span id="index-span">#</span>
                        <span id="user-span">유저 UId</span>
                        <span id="is-success-span">성공 여부</span>
                      </div>
                      
                      {mission.users ? mission.users
                      .sort((a, b) => {
                        // 먼저 is_success가 0인 유저들을 앞으로
                        if (a.is_success < b.is_success) return -1;
                        if (a.is_success > b.is_success) return 1;
                        
                        // is_success가 같으면 user_id를 문자열로 변환하여 비교
                        let userA = String(a.nickname);
                        let userB = String(b.nickname);
                        return userA.localeCompare(userB);
                      })
                      .map((user, index) => (
                        <ListItem
                          id="menu-mission-table-user-list-item"
                          className={user.is_success === 1 ? 'success-background' : 'failure-background'}
                        >
                          <span id="index-span">{index+1}</span>
                          <span id="user-span">{user.nickname}</span>
                          <span id="is-success-span">{user.is_success === 1 ? "O" : "X"}</span>
                        </ListItem>
                      )) : ''}
                    </List>
                  </TableCell>
                )}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default MissionTable;
