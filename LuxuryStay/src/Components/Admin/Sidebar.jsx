import React from 'react'
import { assets } from '../../assets/assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const sidebarLinks = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: assets.dashboardIcon
        },
        {
            name: "Add Room",
            path: "/admin/add-room",
            icon: assets.addIcon
        },
        {
            name: "List Room",
            path: "/admin/list-room",
            icon: assets.listIcon
        },
        {
            name: "Staff",
            path: "/admin/staff",
            icon: assets.userIcon
        }
    ]

    return (
        <div className='md:w-64 w-16 border-r border-gray-300 h-full pt-4 flex flex-col transition-all duration-300'>

            {sidebarLinks.map((item, index) => (

                <NavLink
                    key={index}
                    to={item.path}
                    end={item.path === "/admin"}
                    className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-4 md:px-8 transition-all duration-200
                        
                        ${isActive
                            ? "border-r-4 md:border-r-[6px] border-blue-600 bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                    }
                >

                    <img
                        src={item.icon}
                        alt={item.name}
                        className='w-6 h-6 min-w-6'
                    />

                    <p className='hidden md:block font-medium'>
                        {item.name}
                    </p>

                </NavLink>
            ))}

        </div>
    )
}

export default Sidebar