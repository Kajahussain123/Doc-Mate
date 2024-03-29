import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertSlice'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import DoctorForm from '../components/DoctorForm'
import moment from 'moment'


function BookAppointments() {
    const [isAvailabe, setIsAvailable] = useState(false)
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const { user } = useSelector((state) => state.user)
    const [doctor, setDoctor] = useState(null)
    const params = useParams()

    const dispatch = useDispatch()

    const getDoctorData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/doctor/get-doctor-info-by-id",
                {
                    doctorId: params.doctorId,
                },


                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            dispatch(hideLoading())
            if (response.data.success) {
                setDoctor(response.data.data)
            }

        } catch (error) {
            console.log(error);
            dispatch(hideLoading())

        }

    }

    const bookNow = async () => {
        setIsAvailable(false)
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/user/book-appointment",
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctor,
                    userInfo: user,
                    date: date,
                    time: time,
                },


                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)

            }

        } catch (error) {
            toast.error("Error booking apointment")
            dispatch(hideLoading())

        }
    }

    const checkAvailability = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/user/check-booking-availability",
                {
                    doctorId: params.doctorId,
                    date: date,
                    time: time,
                },


                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                setIsAvailable(true)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error("Error booking apointment")
            dispatch(hideLoading())

        }
    }

    useEffect(() => {


        getDoctorData()

    }, [user])
    return (
        <Layout>
            {doctor && (
                <div>
                    <h1 className='page-title'>{doctor.firstName} {doctor.lastName}</h1> <hr />

                    <Row gutter={20} className='mt-5' align="middle">
                    <Col span={8} sm={24} xs={24} lg={8}>
                    <img src="https://i.postimg.cc/W1cn3TWc/5a8302e2abc3d121aba7121e.png" alt="" 
                       width="100%" height='300'/>
                        </Col>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <h1 className='normal-text'><b>Timings : </b>{doctor.timings[0]} - {doctor.timings[1]}</h1>
                            <p><b>Phone Number : </b> {doctor.phoneNumber}</p>
                            <p><b>Address : </b> {doctor.address}</p>
                            <p><b>Fee Per Visit : </b> {doctor.feePerConsultation}</p>

                            <div className='d-flex flex-column pt-2'>
                                <DatePicker format="DD-MM-YYYY" onChange={(value) => { setDate(moment(value).format("DD-MM-YYYY")); setIsAvailable(false) }} />
                                <TimePicker
                                    format="HH:mm"
                                    className='mt-3'
                                    onChange={(value) => {
                                        setIsAvailable(false);
                                        setTime(moment(value).format("HH:mm"));
                                    }}
                                />
                                <Button className='primary-button mt-3 full-width-button' onClick={checkAvailability}>Check Availability</Button>
                                {isAvailabe && (
                                    <Button className='primary-button mt-3 full-width-button' onClick={bookNow}>Book Now</Button>
                                )}
                            </div>
                        </Col>
                       
                    </Row>
                </div>
            )}
        </Layout>
    )
}

export default BookAppointments