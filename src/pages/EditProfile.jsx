import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

function EditProfile() {
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    const [name,setName] = useState(userData.name)
    const [description,setDescription] = useState(userData.description || "")
    const [photoUrl,setPhotUrl] = useState(null)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)

    const formData = new FormData()
    formData.append("name",name)
    formData.append("description",description)
    formData.append("photoUrl",photoUrl)

    const handleeditprofile = async()=>{
        setLoading(true)
        try {
            const result = await axios.post(serverUrl+"/api/user/profile",formData,{withCredentials:true})
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate("/")
            toast.success("Profile Updated")

        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 '>
            <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
                <FaArrowLeftLong className='absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/profile")} />
                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'> Edit Profile</h2>
                <form action="" className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
                    <div className='flex flex-col items-center text-center'>
                        {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-[black]' alt="" /> :
                            <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
                                {userData?.name.slice(0, 1).toUpperCase()}
                            </div>}
                    </div>
                    <div >
                        <label htmlFor="image" className='text-sm font-medium text-gray-700'>Select Avthar</label>
                        <input id='image' type="file" className='w-full px-4 py-2 border rounded-md text-sm' name="photoUrl" accept='image/*' onChange={(e)=>setPhotUrl(e.target.files[0])}/>
                    </div>
                    <div >
                        <label htmlFor="name" className='text-sm font-medium text-gray-700'>User Name</label>
                        <input id='name' type="text" className='w-full px-4 py-2 border rounded-md text-sm'  placeholder={userData.name} onChange={(e)=>setName(e.target.value)}  value={name}/>
                    </div>
                    <div >
                        <label htmlFor="email" className='text-sm font-medium text-gray-700'>Email</label>
                        <input readOnly id='email' type="text" className='w-full px-4 py-2 border rounded-md text-sm'  value={userData.email} />
                    </div>
                    <div >
                        <label className='text-sm font-medium text-gray-700'>Bio</label>
                        <textarea name='description' className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black]' placeholder='Tell us about yourself' rows={3} onChange={(e)=>setDescription(e.target.value)} value={description} />
                    </div>
                    <button className='w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer' disabled={loading} onClick={handleeditprofile}>{loading?<ClipLoader size={30} color='white'/>: "Save Changes"}</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile