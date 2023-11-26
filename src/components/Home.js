import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import { networkrequest}  from './Header/XHR.js';
import { networkrequest2}  from './Header/XHR2.js';


const Home = () => {
    

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        id: "",
        name: "",
        nickname: "",
        email: "",
        password: "",
        passwordagain: "",
        manager_coe:""
    })
    const [data,setData] =  useState(null); // 초기값을 null로 설정

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://13.125.10.254:5000/user/all/', true);
        
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const fetchedData = JSON.parse(xhr.responseText);
              setData(fetchedData.data);
              console.log('list', fetchedData.data)
          }
        };
        xhr.withCredentials = true;
        xhr.send();
      }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함
    // console.log(inpval);
    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    const addData = (e) => {
        e.preventDefault();

        const { id,name, nickname, email,  password, passwordagain,manager_code } = inpval;

        if (id === "") {
            toast.error(' 아이디를 입력해주세요',{
                position: "top-center",
            });
        }else if (name === "") {
            toast.error(' 이름을 입력해주세요',{
                position: "top-center",
            });
        } else if (nickname === "") {
            toast.error(' 닉네임을 입력해주세요',{
                position: "top-center",
            });
        } else if (email === "") {
             toast.error('이메일을 입력해주세요',{
                position: "top-center",
            });
        } else if (!email.includes("@")) {
             toast.error('plz enter valid email addres',{
                position: "top-center",
            });
        } else if (password === "") {
             toast.error('비밀번호를 입력해주세요',{
                position: "top-center",
            });
        } else if (password.length < 5) {
             toast.error('5자 이상으로 비밀번호를 설정해주세요',{
                position: "top-center",
            });
        } else if (password !== passwordagain){
            toast.error('비밀번호가 일치하지 않습니다',{
                position: "top-center",
            });
        } else if (manager_code !== "neetcompany12#$"){
            toast.error('관리자 코드가 맞지 않습니다',{
                position: "top-center",
            });
        }else {

            var newPerson = {
                login_id: inpval.id,
                password: inpval.password,
                user_name: inpval.name,
                nickname: inpval.nickname,
                email: inpval.email
              };
            var res = {};
            for (let [key, value] of Object.entries(newPerson)) {

                res[key] = value.replace(/-/g, '_');
            }
            networkrequest2('user/add/', res,console.log)
            .then((result) => {
                console.log('Success:', result);
                var res1 = {};
                res1['userId']=  result.data.user_id;
                networkrequest('user/makeManager',res1,console.log);
                var addD = {
                    user_id : result.data.user_id, 
                    login_id : inpval.id, 
                    password : inpval.password, 
                    user_name : inpval.name, 
                    nickname : inpval.nickname, 
                    email : inpval.email, 
                    team_id : 0, 
                    is_manager : 1
                }
                setData((prevData) => [...prevData, addD]);
                console.log('setData after', data);

            })
            .catch((error) => {
                console.error('Error:', error.message);
            });

            console.log("성공적으로 회원가입되었습니다");
            history("/login")
            localStorage.setItem("useryoutube",JSON.stringify([...data,inpval]));

        }

    }

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-5 p-5" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>회원가입</h3>
                        <Form >
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicId">

                            <Form.Control type="text" name='id' onChange={getdata} placeholder="Enter Your ID" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">

                                <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicNickName">

                                <Form.Control type="text" name='nickname' onChange={getdata} placeholder="Enter Your Nickname" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='passwordagain' onChange={getdata} placeholder="Enter Your Password Again " />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='manager_code' onChange={getdata} placeholder="Manager Code" />
                            </Form.Group>

                            <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>이미 계정이 존재하시나요 <span><NavLink to="/login">로그인하기</NavLink></span> </p>
                    </div>
                    <SIgn_img />
                </section>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Home