import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from '../lib/styleUtil';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: oc.teal[9],
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: oc.lime[1],
      },
      '&:nth-of-type(even)': {
        backgroundColor: oc.lime[2],
      },
    },
  }))(TableRow);
  
  function createData(name,id,email, password, team) {
    return { name,id,email, password, team };
  }
  
  const rows = [
    createData('박쿵야','imkungya','ii@kaist.ac.kr','lakaj','1'),
    createData('박쿵야','imkungya','ii@kaist.ac.kr','laefaefkaj','1'),
    createData('박쿵야','imkungya','ii@kaist.ac.kr','la3r3kaj','1'),
    createData('박쿵야','imkbabungya','ii@kaist.ac.kr','lakafasfaj','222'),
    createData('박쿵야','imkuabadngya','ii@kaist.ac.kr','lakaj','15'),
    createData('박쿵야','imkungya','ii@kaist.ac.kr','labbdbkaj','1333'),
    createData('박쿵야','imkungya','ii@kaist.ac.kr','lakaj','1'),
    createData('박쿵야','imk22ungya','ii@kaist.ac.kr','lakaj','144'),
    createData('박쿵야','335','ii@kaist.ac.kr','lakaj','15'),
    createData('박쿵야','im345gfgkungya','ii@kaist.ac.kr','lakaj','1')
  ];

  function createData2(name,id,email, password) {
    return { name,id,email, password};
  }
  
  const rows2 = [
    createData('박쿵야','imkungya','ii@kaist.ac.kr','lakaj'),
    createData('박쿵야','imkungya','ii@kaist.ac.kr','laefaefkaj'),
    createData('박쿵야','imkungya','ii@kaist.ac.kr','la3r3kaj'),
    createData('박쿵야','imkbabungya','ii@kaist.ac.kr','lakafasfaj'),
  ];
  

const CheckButton = styled(Link)`
    font-weight: 600;
    color: ${oc.red[9]};
    border: 1px solid ${oc.red[9]};
    padding: 0.4rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 1.5px;
    text-decoration: none;
    transition: .2s all;
    &:hover {
        background: ${oc.red[9]};
        color: white;
        ${shadow(1)}
    }
    &:active {
        /* 마우스 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

const AddButton = styled(Link)`
    font-weight: 600;
    color: ${oc.lime[9]};
    border: 1px solid ${oc.lime[9]};
    padding: 0.4rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 1.5px;
    text-decoration: none;
    transition: .2s all;
    &:hover {
        background: ${oc.lime[9]};
        color: white;
        ${shadow(1)}
    }
    &:active {
        /* 마우스 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const tableStyle = {
    width: 1200,

    
  };


const MenuPerson = () => {
    return (
        <div id="menu-person-container" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div id="menu-person-body1" style={{display: 'flex', flex: 1, marginBottom: '3rem'}}>
                <div id="menu-person-body1-header" style={{display: 'flex', flex: 1.5, padding: '1rem 1rem 0 1rem', alignItems: 'end'}}>
                    <span style={{fontSize: '2.5rem', fontWeight: '800'}}>
                        회원목록
                    </span>
                </div>
                <Spacer/>
                <div id="menu-person-button1" style={{display: 'flex', flex: 1, alignItems: 'end'}}>
                    <AddButton to="./">
                        추가
                    </AddButton>
                    <CheckButton to="./">
                        확인
                    </CheckButton>
                    </div>
            </div>
            <div id="menu-person-list1" style={{display: 'flex', flex: 1, marginBottom: '3rem'}}>
            <TableContainer component ={Paper}>
                <Table classname = "app1" aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>이름</StyledTableCell>
                            <StyledTableCell align="left">ID</StyledTableCell>
                            <StyledTableCell align="left">이메일</StyledTableCell>
                            <StyledTableCell align="left">비밀번호</StyledTableCell>
                            <StyledTableCell align="left">팀</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row)=> (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                            <StyledTableCell align="left">{row.id}</StyledTableCell>
                            <StyledTableCell align="left">{row.email}</StyledTableCell>
                            <StyledTableCell align="left">         </StyledTableCell>
                            <StyledTableCell align="left">{row.team}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            <div id="menu-person-body2" style={{display: 'flex', flex: 1, marginBottom: '3rem'}}>
                <div id="menu-person-body2-header" style={{display: 'flex', flex: 1.5, padding: '1rem 1rem 0 1rem', alignItems: 'end'}}>
                    <span style={{fontSize: '2.5rem', fontWeight: '800'}}>
                        관리자목록
                    </span>
                </div>
                <Spacer/>
                <div id="menu-person-button2" style={{display: 'flex', flex: 1, alignItems: 'end'}}>
                    <AddButton to="./">
                        추가
                    </AddButton>
                    <CheckButton to="./">
                        확인
                    </CheckButton>
                    </div>
            </div>
            <div id="menu-person-list2" style={{display: 'flex', flex: 1, marginBottom: '3rem'}}>
            <TableContainer component ={Paper}>
                <Table classname = "app2" aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>이름</StyledTableCell>
                            <StyledTableCell align="left">ID</StyledTableCell>
                            <StyledTableCell align="left">이메일</StyledTableCell>
                            <StyledTableCell align="left">비밀번호</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows2.map((row)=> (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                            <StyledTableCell align="left">{row.id}</StyledTableCell>
                            <StyledTableCell align="left">{row.email}</StyledTableCell>
                            <StyledTableCell align="left">         </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
        
    );
};

export default MenuPerson;