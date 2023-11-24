import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import Tr from './Tr';
import Post from './Post';
import Modal from './Modal';
import Modal2 from './Modal2';
import { TableRow, TableHead, TableCell } from "@mui/material";
import { networkrequest } from './Header/XHR.js';
import { networkrequest2 } from "./Header/XHR2.js";

const WhiteBackground = styled.div`
    background: green;
    display: flex;
    justify-content: start;
    height: auto;
`;

function MenuPerson() {
    const nextId = useRef(10);
    const [userData, setUserData] = useState(null); // 초기값을 null로 설정
    const [info, setInfo] = useState([]);
    const [info_ma, setInfo_ma] = useState([]);
    const [selected, setselected] = useState(null);
    const [modalOn, setmodalon] = useState(false);
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await networkrequest('user/all/');
    //             if (response.status === 200) {
    //                 const data = response.data.data;
    //                 setUserData(data);
    //                 setInfo(data.filter(item => item.is_manager === 0));
    //                 setInfoMa(data.filter(item => item.is_manager === 1));
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        networkrequest('user/all/', {}, (data) => {
            setUserData(data.data);
            setInfo(data.data.filter(item => item.is_manager === 0));
            setInfo_ma(data.data.filter(item => item.is_manager === 1));
        })
        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', 'http://13.125.10.254:5000/user/all/', true);

        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         const fetchedData = JSON.parse(xhr.responseText);
        //         setUserData(fetchedData.data);
        //         console.log('list', fetchedData.data)
        //     }
        // };
        // xhr.withCredentials = true;
        // xhr.send();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

    // let data_manager = [];
    // let data = [];

    // if (userData !== null) {
    //     data_manager = userData.filter(item => item.is_manager === 1);
    //     data = userData.filter(item => item.is_manager === 0);
    // }

    // useEffect(() => {
    //     let data_manager = [];
    //     let data_filtered = [];

    //     if (userData !== null) {
    //         data_manager = userData.filter(item => item.is_manager === 1);
    //         data_filtered = userData.filter(item => item.is_manager === 0);
    //     }

    //     setInfo(data_filtered);
    //     setInfo_ma(data_manager);
    // }, [userData]); // d가 변경될 때마다 실행


    const handleSave = (dataa) => {
        console.log("heelo", dataa)
        if (dataa.is_manager === 0) { //user
            //data 수정하기
            if (dataa.user_id) {
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
                    })
                    .catch((error) => {
                        console.error('Error:', error.message);
                    });
            }
        }

        else { //manager
            //data 수정하기
            if (dataa.user_id) {
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
                        }
                        // a = result.user_id;
                    })
                    .catch((error) => {
                        console.error('Error:', error.message);
                    });
                console.log(userData);
            }
        }
    }

    const handleRemove = (user_id) => {

        var res = {};
        res['userId'] = user_id;
        // for (let [key, value] of Object.entries(removePerson)) {

        //     res[key] = value.replace(/-/g, '_');
        // }
        // console.log(res);
        networkrequest('user/delete/', res, console.log);
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
                <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>사용자목록</span>
            </WhiteBackground>

            <table className='min-w-full table-auto text-gray-800' style={{ marginTop: '10px', marginBottom: '50px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">이메일</TableCell>
                        {/* <TableCell align="left">비밀번호</TableCell> */}
                        <TableCell align="left">팀</TableCell>
                        <TableCell align="center">수정</TableCell>
                        <TableCell align="center">삭제</TableCell>
                    </TableRow>
                </TableHead>
                <Tr info={info} handleRemove={handleRemove} handleEdit={handleEdit} />
            </table>

            <hr style={{ borderBottom: '2px solid #000', width: '100%' }} />
            <WhiteBackground>
                <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>관리자목록</span>
            </WhiteBackground>

            <table className='min-w-full table-auto text-gray-800' style={{ marginTop: '10px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">이메일</TableCell>
                        {/* <TableCell align="left">비밀번호</TableCell> */}
                        <TableCell align="center">수정</TableCell>
                        <TableCell align="center">삭제</TableCell>
                    </TableRow>
                </TableHead>
                <Tr info={info_ma} handleRemove={handleRemove} handleEdit={handleEdit} />
            </table>


            {modalOn && selected.is_manager === 0 && <Modal selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit} />}
            {modalOn && selected.is_manager === 1 && <Modal2 selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit} />}


        </div>


    );
};

export default MenuPerson;