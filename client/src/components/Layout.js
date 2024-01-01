import React, { useState } from 'react'
import '../layout.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';


function Layout({ children }) {

    const [collapsed, setCollapsed] = useState(false)
    const { user } = useSelector((state) => state.user)

    const navigate = useNavigate()

    const location = useLocation()

    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house",
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "fa-solid fa-calendar-check",
        }, {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "fa-solid fa-user-doctor",
        },
        

    ];

    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house",
        },
        {
            name: "Appointments",
            path: "/doctor/appointments",
            icon: "fa-solid fa-calendar-check",
        }, 
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "fa-solid fa-user",
        },

    ];

    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house",
        },
        {
            name: "Users",
            path: "/users",
            icon: "fa-solid fa-users",
        }, {
            name: "Doctors",
            path: "/doctors",
            icon: "fa-solid fa-user-doctor",
        },
        

    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role=user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className="sidebar-header">
                        <img height="80px" width="80px" src="https://i.postimg.cc/FsVmd3tR/dm-logo-design-initial-dm-letter-logo-design-monogram-design-pro-vector-removebg-preview.png" alt="" />
                        <h1 className='role'>{role}</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (<div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                            )
                        })}
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear()
                            navigate('/login')
                        }}>
                            <i className='fa-solid fa-right-from-bracket'></i>
                            {!collapsed && <Link to='/login'>Logout</Link>}
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        {collapsed ? (<i className="fa-solid fa-bars header-action-icon" onClick={() => setCollapsed(false)}></i>) : (<i className="fa-solid fa-xmark header-action-icon" onClick={() => setCollapsed(true)}></i>)}
                        <div className='d-flex align-items-center px-4'>
                            <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')} >
                                <i className="fa-solid fa-bell header-action-icon px-3"></i>
                            </Badge>
                            <Link className='anchor mx-3' to={'/profile'}>{user?.name}</Link>
                        </div>
                    </div>

                    <div className='body'>
                        {children}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Layout