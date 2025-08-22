import React from 'react'
import about from '../assets/about.jpg'
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import video from '../assets/video.mp4'

function About() {
    return (
        <div className='w-[100vw] lg:h-[70vhh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px] '>
            {/* for image */}
            <div className='lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex items-center justify-center relative'>
                <img src={about} className='w-[80%] h-[90%] rounded-lg ' alt="" />
                <div className='max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%]'>
                    <video src={video} className='w-full rounded-xl shadow-lg border-2 border-white ' muted controls autoPlay loop />
                </div>
            </div>


            {/* for about info */}
            <div className='lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex items-start justify-center flex-col px-[35px] md:px-[80px]'>
                <div className='flex text-[18px] items-center justify-center gap-[20px]'>About Us <TfiLayoutLineSolid className='w-[40px] h-[40px]' /></div>
                <div className='md:text-[45px] text-[35px] font-semibold'>We Maximize Your Learning Growth</div>

                <div className='text-[15px] '>We provide a modern Learing Management System to simplify online education , track progress and enhance student-instructor collaboration effeciently.</div>
                <div className='w-[100%] lg:w-[60%]'>
                    <div className='flex items-center justify-between mt-[40px]'>
                        <div className='flex items-center justify-center gap-[10px] '>
                            <BsFillPatchCheckFill className='w-[20px] h-[20px]'/>Simplified Learning
                        </div>
                        <div className='flex items-center justify-center gap-[10px] '>
                            <BsFillPatchCheckFill className='w-[20px] h-[20px]'/>Expert Training
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-[40px]'>
                        <div className='flex items-center justify-center gap-[10px] '>
                            <BsFillPatchCheckFill className='w-[20px] h-[20px]'/>Big Experience
                        </div>
                        <div className='flex items-center justify-center gap-[10px] '>
                            <BsFillPatchCheckFill className='w-[20px] h-[20px]'/>LifeTime Access
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About