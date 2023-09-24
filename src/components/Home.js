import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: "",
        passwordagain: ""
    })

   

    const [data,setData] = useState([]);
    console.log(inpval);

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

        const { name, email,  password, passwordagain } = inpval;

        if (name === "") {
            toast.error(' 이름을 입력해주세요',{
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
        } else {
            console.log("성공적으로 회원가입되었습니다");
            history("/login")
            localStorage.setItem("useryoutube",JSON.stringify([...data,inpval]));

        }

    }

    return (
        <>
            <div className="container mt-5">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-5 p-5" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>회원가입</h3>
                        <Form >
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
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
        </>
    )
}

export default Home