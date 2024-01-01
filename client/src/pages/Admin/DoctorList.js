import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import axios from 'axios'
import { Table } from 'antd'
import toast from 'react-hot-toast'
import moment from 'moment'



function DoctorList() {

  const [doctors, setDoctors]=useState([])
  const dispatch=useDispatch()
  const getDoctorsData=async()=>{
      try {
          dispatch(showLoading())
          const response=await axios.get("/api/admin/get-all-doctors",  {
              headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
              },
          })
          dispatch(hideLoading())
          if(response.data.success){
            setDoctors(response.data.data)
            
          }
      } catch (error) {
          dispatch(hideLoading())
         
      }
  }

  const changeDoctorStatus=async( record, status)=>{
    try {
        dispatch(showLoading())
        const response=await axios.post("/api/admin/change-doctor-account-status",{doctorId:record._id, user_id:record.userId,status:status},  {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        })
        dispatch(hideLoading())
        if(response.data.success){
          toast.success(response.data.message)
         getDoctorsData()
          
        }
    } catch (error) {
      toast.error("Error changing doctor account status")
        dispatch(hideLoading())
       
    }
}

  useEffect(()=>{

    getDoctorsData()

},[])
  


  const columns=[
    {
        title:"Name",
        dataIndex:"name",
        render:(text,record)=>(<span className='normal-text'>{record.firstName} {record.secondName}</span> )       
    },
   
    {
      title:"Phone",
      dataIndex:"phoneNumber"
  },
    {
        title:"Created At",
        dataIndex:"createdAt",
        render:(record, text)=>moment(record.createdAt).format("DD-MM-YYYY")

    },
    {
      title:"Status",
      dataIndex:"status"
  },
    {
        title:"Actions",
        dataIndex:"actions",
        render:(text,record)=>(
            <div className='d-flex'>
            {record.status==="pending" && <h1 className='anchor' onClick={()=>changeDoctorStatus(record,'approved')}>Approve</h1>}
            {record.status==="approved" && <h1 className='anchor' onClick={()=>changeDoctorStatus(record,'blocked')}>Block</h1>}

            </div>
        )
    }
]
  return (
    
    <Layout>
        <h1 className='page-header p-2'>Doctor List</h1>
        <Table columns={columns} dataSource={doctors} />

    </Layout>
  )
}

export default DoctorList