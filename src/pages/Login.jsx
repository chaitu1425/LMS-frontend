import React from 'react'
import { useState } from 'react'
import logo from "../assets/logo.png"
import google from "../assets/google.jpg"
import { IoEye } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { setUserData } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/fireabse';
import { FaArrowLeftLong } from "react-icons/fa6";


function Login() {
  const [show,SetShow] = useState(false);
  const [email,SetEmail] = useState("")
  const [password,SetPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
    const handlelogin = async()=>{
        setLoading(true)
        try {
            const data = {email,password}
            const result=await axios.post(serverUrl + '/api/auth/login',data,{withCredentials:true})
            dispatch(setUserData(result.data))
            setLoading(false)
            toast.success("Login Successful")
            navigate("/")
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const googleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName
            let email = user.email
            let role = ""

            await axios.post(serverUrl + "/api/auth/googleauth", { name, email, role }, { withCredentials: true })
            navigate("/")
            toast.success("Login Successful")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
      return (
          <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center ' >
              <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex relative' onSubmit={(e)=>{e.preventDefault()}}>
                <FaArrowLeftLong className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
                  <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                      {/* left-div */}
                      <div>
                        
                          <h1 className='font-semibold text-[black] text-2xl '>Welcome Back</h1>
                          <h2 className='text-[#999797] text-[16px]'>Login your Account</h2>
                      </div>
                      <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                          <label htmlFor="email" className='font-semibold'>Email</label>
                          <input type="text" id="email" onChange={(e)=>SetEmail(e.target.value)} value={email} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] ' placeholder='Your Email' />
                      </div>
                      <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                          <label htmlFor="password" className='font-semibold'>Password</label>
                          <input type={show ? "text" : "password"} id="password" onChange={(e)=>SetPassword(e.target.value)} value={password} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] ' placeholder='Your Password' />
                          {
                              show ? <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[20px] bottom-[10%]' onClick={()=>{SetShow(prev=>!prev)}} /> :
                              <IoEye className='absolute w-[20px] h-[20px] cursor-pointer right-[20px] bottom-[10%]' onClick={()=>{SetShow(prev=>!prev)}} />
                          }
                      </div>
                      <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' onClick={handlelogin} disabled={loading}>{loading? <ClipLoader size={30} color='white'/>: "Login"}</button>
                      <span className='text-[13px] cursor-pointer text-[#585757]' onClick={()=>navigate('/forgot')}>Forgot Password?</span>
                      <div className='w-[80%] flex items-center gap-2'>
                          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
                          <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or Continue</div>
                          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                      </div>
                      <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center' onClick={googleLogin}>
                          <img src={google} className='w-[25px]'  alt='' />
                          <span className='text-[18px]'>oogle</span>
                      </div>
                      <div className='text-[#6f6f6f] '>New User?
                        <span className='underline underline-offset-1 cursor-pointer' onClick={()=>navigate("/signup")}>SignUp</span>
                    </div>
                  </div>
                  <div className='w-[50%] h-[100%] rounded-r-2xl bg-[#5d8452] md:flex items-center justify-center flex-col hidden'>
                      {/* right-div */}
                      <img src={logo} alt=''></img>
                  </div>
              </form>
          </div>
  )
}

export default Login