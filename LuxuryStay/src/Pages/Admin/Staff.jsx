import React, { useState } from 'react'
import Title from '../../Components/Title'
import { assets } from '../../assets/assets/assets'

const Staff = () => {

    const [staffs, setStaffs] = useState([
        {
            id: 1,
            name: "Ali Raza",
            role: "Manager",
            email: "ali@example.com",
            phone: "+92 300 1234567",
            department: "Management",
            status: "Active"
        },
        {
            id: 2,
            name: "Sara Khan",
            role: "Receptionist",
            email: "sara@example.com",
            phone: "+92 311 7654321",
            department: "Front Desk",
            status: "Active"
        },
        {
            id: 3,
            name: "Ahmed Noor",
            role: "Housekeeping",
            email: "ahmed@example.com",
            phone: "+92 321 1122334",
            department: "Cleaning",
            status: "Inactive"
        }
    ])

    const [showForm, setShowForm] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        phone: '',
        department: '',
        status: 'Active'
    })

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Add Staff
    const handleSubmit = (e) => {
        e.preventDefault()

        const newStaff = {
            id: Date.now(),
            ...formData
        }

        setStaffs([...staffs, newStaff])

        setFormData({
            name: '',
            role: '',
            email: '',
            phone: '',
            department: '',
            status: 'Active'
        })

        setShowForm(false)
    }

    // Toggle Active/Inactive
    const toggleStatus = (id) => {

        setStaffs(
            staffs.map((staff) =>
                staff.id === id
                    ? {
                        ...staff,
                        status:
                            staff.status === "Active"
                                ? "Inactive"
                                : "Active"
                    }
                    : staff
            )
        )
    }

    // Delete Staff
    const deleteStaff = (id) => {
        setStaffs(staffs.filter((staff) => staff.id !== id))
    }

    return (

        <div className='w-full'>

            {/* Title */}
            <Title
                align='left'
                font='outfit'
                title={<>Staff Management</>}
                subTitle={
                    <>
                    <div className='mt-10'>
                        Create, manage, and monitor staff accounts,
                        assign roles and permissions, and control
                        staff <br />accessibility within the hotel system.
                    </div>
                        
                    </>
                }
            />

            {/* Top Button */}
            <div className='flex justify-end my-6'>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition'
                >
                    {showForm ? "Close Form" : "Add Staff"}
                </button>

            </div>

            {/* Add Staff Form */}
            {showForm && (

                <form
                    onSubmit={handleSubmit}
                    className='grid grid-cols-1 md:grid-cols-2 gap-5 border border-gray-200 rounded-2xl p-6 mb-8 bg-white'
                >

                    {/* Name */}
                    <div>
                        <label className='text-gray-700 font-medium'>
                            Full Name
                        </label>

                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter full name'
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500'
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className='text-gray-700 font-medium'>
                            Role
                        </label>

                        <select
                            name='role'
                            value={formData.role}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500'
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Manager">Manager</option>
                            <option value="Receptionist">Receptionist</option>
                            <option value="Housekeeping">Housekeeping</option>
                            <option value="Security">Security</option>
                            <option value="Accountant">Accountant</option>
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className='text-gray-700 font-medium'>
                            Email
                        </label>

                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter email'
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500'
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className='text-gray-700 font-medium'>
                            Phone
                        </label>

                        <input
                            type='text'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder='Enter phone number'
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500'
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className='text-gray-700 font-medium'>
                            Department
                        </label>

                        <input
                            type='text'
                            name='department'
                            value={formData.department}
                            onChange={handleChange}
                            placeholder='Enter department'
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500'
                            required
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className='text-gray-700 font-medium'>
                            Status
                        </label>

                        <select
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500'
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <div className='md:col-span-2'>
                        <button
                            type='submit'
                            className='bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition'
                        >
                            Save Staff
                        </button>
                    </div>

                </form>
            )}

            {/* Staff Table */}
            <div className='overflow-x-auto border border-gray-200 rounded-2xl'>

                <table className='w-full text-sm text-left'>

                    {/* Table Head */}
                    <thead className='bg-gray-50 text-gray-700'>

                        <tr>

                            <th className='px-6 py-4 font-medium'>
                                Name
                            </th>

                            <th className='px-6 py-4 font-medium'>
                                Role
                            </th>

                            <th className='px-6 py-4 font-medium'>
                                Email
                            </th>

                            <th className='px-6 py-4 font-medium'>
                                Phone
                            </th>

                            <th className='px-6 py-4 font-medium'>
                                Department
                            </th>

                            <th className='px-6 py-4 font-medium'>
                                Status
                            </th>

                            <th className='px-6 py-4 font-medium'>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    {/* Table Body */}
                    <tbody>

                        {staffs.map((staff) => (

                            <tr
                                key={staff.id}
                                className='border-t border-gray-200 hover:bg-gray-50 transition'
                            >

                                <td className='px-6 py-4'>
                                    {staff.name}
                                </td>

                                <td className='px-6 py-4'>
                                    {staff.role}
                                </td>

                                <td className='px-6 py-4'>
                                    {staff.email}
                                </td>

                                <td className='px-6 py-4'>
                                    {staff.phone}
                                </td>

                                <td className='px-6 py-4'>
                                    {staff.department}
                                </td>

                                <td className='px-6 py-4'>

                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                                        
                                        ${staff.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {staff.status}
                                    </span>

                                </td>

                                {/* Actions */}
                                <td className='px-6 py-4 flex gap-3'>

                                    {/* Toggle */}
                                    <button
                                        onClick={() =>
                                            toggleStatus(staff.id)
                                        }
                                        className={`w-12 h-6 flex items-center rounded-full p-1 transition
                                            
                                            ${staff.status === "Active"
                                                ? "bg-blue-600"
                                                : "bg-gray-300"
                                            }`}
                                    >

                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
                                                
                                                ${staff.status === "Active"
                                                    ? "translate-x-6"
                                                    : "translate-x-0"
                                                }`}
                                        />

                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() =>
                                            deleteStaff(staff.id)
                                        }
                                        className='text-red-500 hover:text-red-700'
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Staff