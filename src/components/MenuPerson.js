import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import Tr from './Tr';
import Post from './Post';
import Modal from './Modal';
import Modal2 from './Modal2';
import { TableRow, TableHead, TableCell } from "@mui/material";
import { networkrequest } from './Header/XHR.js';
import { networkrequest2 } from "./Header/XHR2.js";
import SearchComponent from './Team/SearchComponent.js';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const WhiteBackground = styled.div`
    background: #f9bec4;
    display: flex;
    justify-content: start;
    height: auto;
`;

const Background = styled.div`
    background: #FFCFE0;
    display: flex;
    justify-content: start;
    height: auto;
`;

function MenuPerson() {
    const nextId = useRef(10);
    const [userData, setUserData] = useState([]); // 초기값을 null로 설정
    const [info, setInfo] = useState([]);
    const [info_ma, setInfo_ma] = useState([]);
    const [selected, setselected] = useState(null);
    const [modalOn, setmodalon] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm1, setSearchTerm1] = useState('');
    const [filteredUsers1, setFilteredUsers1] = useState([]);

    useEffect(() => {
        networkrequest('user/all/', {}, (data) => {
            setUserData(data.data);
            setInfo(data.data.filter(item => item.is_manager === 0));
            setInfo_ma(data.data.filter(item => item.is_manager === 1));
        })
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

    useEffect(() => {
        if (searchTerm) {
          const lowercasedSearchTerm = searchTerm.toLowerCase();
          const filtered = info.filter((user) =>
            user.user_name.toLowerCase().includes(lowercasedSearchTerm)
          );
          setFilteredUsers(filtered);
        } else {
          setFilteredUsers(info); 
        }
      }, [searchTerm, info]);

    const handleSearch = () => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = info.filter((user) =>
            user.user_name.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredUsers(filtered);
      };

      useEffect(() => {
        if (searchTerm1) {
          const lowercasedSearchTerm = searchTerm1.toLowerCase();
          const filtered = info_ma.filter((user) =>
            user.user_name.toLowerCase().includes(lowercasedSearchTerm)
          );
          setFilteredUsers1(filtered);
        } else {
          setFilteredUsers1(info_ma); 
        }
      }, [searchTerm1, info_ma]);

    const handleSearch1 = () => {
        const lowercasedSearchTerm = searchTerm1.toLowerCase();
        const filtered = info_ma.filter((user) =>
            user.user_name.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredUsers1(filtered);
      };

    //   console.log('filter', filteredUsers1)




    const handleSave = (dataa) => {
        console.log("handleSave", dataa)
        if (dataa.is_manager === 0) { //user
            //data 수정하기
            if (dataa.user_id) {
                console.log('dataa.user_id is not onoe')
                setInfo(
                    info.map(row => dataa.user_id === row.user_id ? {
                        user_id: dataa.user_id,
                        login_id: dataa.login_id,
                        password: dataa.password,
                        user_name: dataa.user_name,
                        nickname: dataa.nickname,
                        email: dataa.email,
                        team_id: dataa.team_id,
                        is_manager: dataa.is_manager
                    } : row))
            }

            else { //데이터 추가하기
                var newPerson = {
                    login_id: dataa.login_id,
                    password: dataa.password,
                    user_name: dataa.user_name,
                    nickname: dataa.nickname,
                    email: dataa.email
                };
                var res = {};
                for (let [key, value] of Object.entries(newPerson)) {

                    res[key] = value.replace(/-/g, '_');
                }

                networkrequest2('user/add/', res, console.log)
                    .then((result) => {
                        console.log('Success:', result);
                        if (result.data !== false) {
                            setInfo(info => info.concat(
                                {
                                    user_id: result.data.user_id,
                                    login_id: dataa.login_id,
                                    password: dataa.password,
                                    user_name: dataa.user_name,
                                    nickname: dataa.nickname,
                                    email: dataa.email,
                                    team_id: dataa.team_id,
                                    is_manager: dataa.is_manager
                                }
                            ))

                        }
                        else {
                            toast.error('이미 존재하는 ID입니다.',{
                                position: "top-center",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error.message);
                    });
            }
        }

        else { //manager
            //data 수정하기
            if (dataa.user_id) {
                console.log('manager data change')
                setInfo_ma(
                    info_ma.map(row => dataa.user_id === row.user_id ? {
                        user_id: dataa.user_id,
                        login_id: dataa.login_id,
                        password: dataa.password,
                        user_name: dataa.user_name,
                        nickname: dataa.nickname,
                        email: dataa.email,
                        team_id: dataa.team_id,
                        is_manager: dataa.is_manager
                    } : row))
            }

            else { //데이터 추가하기
                var newPerson = {
                    login_id: dataa.login_id,
                    password: dataa.password,
                    user_name: dataa.user_name,
                    nickname: dataa.nickname,
                    email: dataa.email
                };
                var res = {};
                for (let [key, value] of Object.entries(newPerson)) {

                    res[key] = value.replace(/-/g, '_');
                }
                networkrequest2('user/add/', res, console.log)
                    .then((result) => {
                        console.log('Success:', result);
                        var res1 = {};
                        res1['userId'] = result.data.user_id;
                        networkrequest('user/makeManager', res1, console.log);
                        if (result.data !== false) {
                            setInfo_ma(info_ma => info_ma.concat(
                                {
                                    user_id: result.data.user_id,
                                    login_id: dataa.login_id,
                                    password: dataa.password,
                                    user_name: dataa.user_name,
                                    nickname: dataa.nickname,
                                    email: dataa.email,
                                    team_id: dataa.team_id,
                                    is_manager: dataa.is_manager
                                }
                            ))
                            // toast.success('성공적으로 관리자가 추가되었습니다.',{
                            //     position: "top-center",
                            // });
                        }
                        else {
                            toast.error('이미 존재하는 ID입니다.',{
                                position: "top-center",
                            });
                        }
                        // a = result.user_id;
                    })
                    .catch((error) => {
                        console.error('Error:', error.message);
                    });
                console.log(userData);
                
            }
        }
        console.log('info', info)
        console.log('info_ma',info_ma)
    }

    const handleRemove = (user_id) => {

        var res = {};
        res['userId'] = user_id;
        console.log('userid', res)
        networkrequest('user/delete/', res, (data) => {if (data.status === "ok") alert("삭제되었습니다.")});
        setInfo(info => info.filter(item => item.user_id !== user_id));
        setInfo_ma(info_ma => info_ma.filter(item => item.user_id !== user_id));
    }

    const handleEdit = (item) => {
        setmodalon(true);
        const selectedData = {
            user_id: item.user_id,
            login_id: item.login_id,
            password: item.password,
            user_name: item.user_name,
            nickname: item.nickname,
            email: item.email,
            team_id: item.team_id,
            is_manager: item.is_manager
        };
        console.log('seled', selectedData);
        setselected(selectedData);
    };

    const handleCancel = () => {
        setmodalon(false);
    }

    const handleEditSubmit = (item, editdata) => {
        console.log('item', item);
        handleSave(item);
        setmodalon(false);
    }



    return (
        <div className='container max-w-screen-lg mx-auto'>
            <Post onSaveData={handleSave} style={{ marginBottom: '150px' }} />
            <WhiteBackground>
                <span style={{ fontSize: '2.5rem', fontWeight: '800' , color : ' black'}}>사용자목록</span>
            </WhiteBackground>
            <div id="menu-person-search" autoComplete="chrome-off" style = {{marginTop : '10px'}}>
            <SearchComponent
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch} />
            </div>

            <table className='min-w-full table-auto text-gray-800' style={{ marginTop: '10px', marginBottom: '50px' }}>
                <TableHead>
                    
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">닉네임</TableCell>
                        <TableCell align="left">이메일</TableCell>
                        {/* <TableCell align="left">비밀번호</TableCell> */}
                        <TableCell align="left">팀</TableCell>
                        <TableCell align="center">수정</TableCell>
                        <TableCell align="center">삭제</TableCell>
                    </TableRow>
                </TableHead>
                
                <Tr info={filteredUsers} handleRemove={handleRemove} handleEdit={handleEdit} />
            </table>

            <hr style={{ borderBottom: '2px solid #000', width: '100%' }} />
            <WhiteBackground>
                <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>관리자목록</span>
            </WhiteBackground>
            <div id="menu-person-search" autoComplete="chrome-off" style = {{marginTop : '10px'}}>
            <SearchComponent
                searchTerm={searchTerm1}
                setSearchTerm={setSearchTerm1}
                onSearch={handleSearch1} />
            </div>

            <table className='min-w-full table-auto text-gray-800' style={{ marginTop: '10px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">닉네임</TableCell>
                        <TableCell align="left">이메일</TableCell>
                        {/* <TableCell align="left">비밀번호</TableCell> */}
                        <TableCell align="center">수정</TableCell>
                        <TableCell align="center">삭제</TableCell>
                    </TableRow>
                </TableHead>
                <Tr info={filteredUsers1} handleRemove={handleRemove} handleEdit={handleEdit} />
            </table>


            {modalOn && selected.is_manager === 0 && <Modal selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit} />}
            {modalOn && selected.is_manager === 1 && <Modal2 selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit} />}
            <ToastContainer />

        </div>


    );
};

export default MenuPerson;