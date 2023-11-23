import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import Header from './Header';

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [d, setData] = useState(null); // 초기값을 null로 설정

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
      }, []);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://13.125.10.254:5000/user/all/');
                const result = await response.json();
                setData(result.data);
                console.log('list1', result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    })


    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }

    const addData = (e) => {
        e.preventDefault();

        const getuserArr = localStorage.getItem("useryoutube");
        console.log('getuserArr',getuserArr);

        const { email, password } = inpval;
        if (email === "") {
            toast.error('이메일을 입력해주세요', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('이메일 형식을 맞춰 입력해주세요(@포함)', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('비밀번호를 입력해주세요', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('5자 이상으로 비밀번호를 작성해주세요', {
                position: "top-center",
            });
        } else {

            // if (getuserArr && getuserArr.length) {
            // const userdata = JSON.parse(getuserArr);
            // console.log(inpval.email);
            // 주어진 배열에서 email과 password가 일치하는 항목 찾기
            console.log(d);
            const userlogin = d.find(item => item.email === inpval.email && item.password === inpval.password);

            // const userlogin = userdata.filter((d, k) => {
            //     return d.email === email && d.password === password  // is_manager 추가해야함.
            // });
            console.log('userlogin',userlogin);

            if (userlogin=== undefined) {
                alert("invalid details")
            } else {
                console.log("성공적으로 로그인되었습니다");
                console.log(JSON.stringify(userlogin))
                localStorage.setItem("user_login", JSON.stringify(userlogin))

                history("/mainpage")
            }
            // }
        }

    }

    return (
        <>
            <Header />
            <div className="container mt-5">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-5 p-5" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>로그인</h3>
                        <Form >

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Eneter Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>계정이 없으신가요 <span><NavLink to="../">회원가입</NavLink></span> </p>
                        {/* <p className='mt-3'>비밀번호를 까먹으셨나요  <span><NavLink to="./findPW">비밀번호 찾기</NavLink></span> </p> */}
                    </div>
                    <SIgn_img />
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login