import React, { useState } from 'react'
import logo from "../assets/logo.png"
import google from "../assets/google.jpg"
import { IoEye } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'
import { setUserData } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/fireabse';
function Signup() {
    const [show, SetShow] = useState(false);

    const navigate = useNavigate()
    const [name, SetName] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [role, SetRole] = useState("student")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()



    const handleSignUp = async () => {
        setLoading(true)

        try {
            const data = { name, email, password, role }
            const res = await axios.post(serverUrl + '/api/auth/signup', data, { withCredentials: true })
            console.log(res.data);
            dispatch(setUserData(res.data))
            setLoading(false)
            navigate("/")
            toast.success("SignUp Successful")
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }


    const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName
            let email = user.email

            await axios.post(serverUrl + "/api/auth/googleauth", { name, email, role }, { withCredentials: true })
            navigate("/")
            toast.success("Signup Successful")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center' >
            <form onSubmit={(e) => { e.preventDefault() }} className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'>
                <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                    {/* left-div */}
                    <div>
                        <h1 className='font-semibold text-[black] text-2xl '>Let's get started</h1>
                        <h2 className='text-[#999797] text-[16px]'>Create your Account</h2>
                    </div>
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="name" className='font-semibold'>Name</label>
                        <input type="text" id="name" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] ' placeholder='Your Name' onChange={(e) => SetName(e.target.value)} value={name} />
                    </div>
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input type="text" id="email" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] ' placeholder='Your Email' onChange={(e) => SetEmail(e.target.value)} value={email} />
                    </div>
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input type={show ? "text" : "password"} id="password" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] ' placeholder='Your Password' onChange={(e) => SetPassword(e.target.value)} value={password} />
                        {
                            show ? <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[20px] bottom-[10%]' onClick={() => { SetShow(prev => !prev) }} /> :
                                <IoEye className='absolute w-[20px] h-[20px] cursor-pointer right-[20px] bottom-[10%]' onClick={() => { SetShow(prev => !prev) }} />
                        }
                    </div>
                    <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
                        <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "student" ? "border-black" : "border-[#646464]"}`} onClick={() => SetRole("student")}>Student</span>
                        <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "educator" ? "border-black" : "border-[#646464]"}`} onClick={() => SetRole("educator")}>Educator</span>
                    </div>
                    <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' onClick={handleSignUp} disabled={loading}>{loading ? <ClipLoader size={30} color='white' /> : "SignUp"}</button>
                    <div className='w-[80%] flex items-center gap-2'>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
                        <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or Continue</div>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                    </div>
                    <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center' onClick={googleSignup}>
                        <img src={google} className='w-[25px]' alt='' />
                        <span className='text-[18px]'>oogle</span>
                    </div>
                    <div className='text-[#6f6f6f] '>Already have an account?
                        <span className='underline underline-offset-1 cursor-pointer' onClick={() => navigate("/login")}>Login</span>
                    </div>

                </div>
                <div className='w-[50%] h-[100%] rounded-r-2xl bg-[#5d8452] md:flex items-center justify-center flex-col hidden'>
                    {/* right-div */}
                    <img src={logo} alt='' ></img>
                </div>
            </form>
        </div>
    )
}

export default Signup


// #5d8452