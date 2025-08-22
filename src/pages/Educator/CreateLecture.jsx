import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { setlectureData } from "../../redux/LectureSlice"
import { toast } from 'react-toastify';
 
function CreateLecture() {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const [lectureTitle,setLectureTitle] = useState("")
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const {lectureData} = useSelector(state=>state.lecture)


    const handleCreateLecture = async()=>{
        setLoading(true)
        try {
            const result = await axios.post(serverUrl+`/api/course/createlecture/${courseId}`,{lectureTitle},{withCredentials:true})
            console.log(result);
            setLoading(false)
            dispatch(setlectureData([...lectureData,result.data.lecture]))
            toast.success("Lecture Added")
            setLectureTitle("")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
            
        }
    }

    useEffect(()=>{
        const getCourseLecture = async()=>{
            try {
                const result = await axios.get(serverUrl+`/api/course/courselecture/${courseId}`,{withCredentials:true})
                console.log(result.data)
                dispatch(setlectureData(result.data.lectures))

            } catch (error) {
                console.log(error);
                
            }
        }
        getCourseLecture()
    },[])

  return (
    <div className='min-h-screen bg-gray-200 flex items-center justify-center '>
        <div className='bg-white shadow-xl rounded-xl w-full max-w-2xl p-6'>
            {/* header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold'>Let's Add a Lecture</h1>
                <p className='text-sm text-gray-500'>Enter the title and add your video lectures to enhance your course content.</p>
            </div>
            {/* input Area */}
            <input type="text" className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' placeholder='e.g. Introduction to MERN Stack' value={lectureTitle} onChange={(e)=>setLectureTitle(e.target.value)} />

            {/* button */}
            <div className='flex gap-4 mb-6'>
                <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium' onClick={()=>navigate(`/editcourse/${courseId}`)}><FaArrowLeftLong/>Back to Course</button>
                <button className='px-5 py-2 rounded-md bg-[black] text-white hover:bg-gray-600 transition-all text-sm font-medium shadow' onClick={handleCreateLecture} disabled={loading} >{loading?<ClipLoader size={30} color='white' />: "+ Create Lecture"}</button>
            </div>
            {/* Lecture List */}
            <div className='space-y-2'>
                {
                    lectureData?.map((lecture,index)=>(
                        <div key={index} className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700'>
                            <span>Lecture -{index + 1} : {lecture.lectureTitle}</span>
                            <FaEdit className='text-gray-500 hover:text-gray-700 cursor-pointer' onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}/>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default CreateLecture