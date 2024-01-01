import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertSlice'



function Login() {

  const dispatch=useDispatch()
  const navigate=useNavigate();

const onFinish=async(values)=>{
  try {
    dispatch(showLoading())
    const response = await axios.post("/api/user/login", values);
    dispatch(hideLoading())
    if (response.data.success) {
      toast.success(response.data.message);
      localStorage.setItem("token",response.data.data)
      navigate("/");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error); 
    toast.error("Something went wrong");
  }}

  return (
    <div className='authentication '>
      <div className='authentication-form card '>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>
          
          <Form.Item label="Email" name='email'>
            <Input placeholder="Email"/>
          </Form.Item>
          <Form.Item label="Password" name='password'>
            <Input placeholder="Password" type='password'/>
          </Form.Item>
         
            <Button className="primary-button my-2 full-width-button" htmlType='submit'>LOGIN</Button>
  
            <Link className='anchor mt-2' to="/register"> Click Here To Register</Link>
          
        </Form>
      </div>


    </div>
  )
}

export default Login