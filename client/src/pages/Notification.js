import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setUser } from '../redux/userSlice'


function Notification() {
    const {user} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const dispatch=useDispatch();

    // if (!user || !user.unseenNotifications) {
    //     return  
    // }

    const deleteAll=async()=>{
      try {
          dispatch(showLoading())
    
          const response = await axios.post("/api/user/delete-all-notifications",{userId: user._id},
          {
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          });
          dispatch(hideLoading())
    
          if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setUser(response.data.data))
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          dispatch(hideLoading())
    
          console.error("Error:", error); 
          toast.error("Something went wrong");
        }
  }

    const markAllAsSeen=async()=>{
        try {
            dispatch(showLoading())
      
            const response = await axios.post("/api/user/mark-all-notification-as-seen",{userId: user._id},
            {
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
            });
            dispatch(hideLoading())
      
            if (response.data.success) {
              toast.success(response.data.message);
              dispatch(setUser(response.data.data))
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideLoading())
      
            console.error("Error:", error); 
            toast.error("Something went wrong");
          }
    }
  return (
    <Layout>
        <h1 className='page-title'>Notifications</h1>
        <Tabs>
            <Tabs.TabPane tab='unseen' key={0}>
                <div className='d-flex justify-content-end'>
                    <h1 className='anchor' onClick={markAllAsSeen}>Mark all as seen</h1>
                </div>
                {user?.unseenNotifications.map((notification)=>(
                    // <div className='card p-2' style={{ cursor: 'pointer' }} onClick={()=>navigate(notification.onClickPath  )}>

                    <div className='card p-2 mt-2' style={{ cursor: 'pointer' }} onClick={()=>navigate(notification.onClickPath)}>
                        <div className='card-text'>{notification.message}</div>
                    </div>
               ) )}
            </Tabs.TabPane>
            <Tabs.TabPane tab='seen' key={1}>
            <div className='d-flex justify-content-end'>
                    <h1 className='anchor' onClick={()=>deleteAll()}>Delete All</h1>
                </div>
                {user?.seenNotifications.map((notification)=>(
                    // <div className='card p-2' style={{ cursor: 'pointer' }} onClick={()=>navigate(notification.onClickPath  )}>

                    <div className='card p-2 mt-2' style={{ cursor: 'pointer' }} onClick={()=>navigate(notification.onClickPath)}>
                        <div className='card-text'>{notification.message}</div>
                    </div>
               ) )}
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default Notification