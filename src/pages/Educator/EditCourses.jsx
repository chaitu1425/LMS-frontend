import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import img from "../../assets/empty.jpg"
import axios from 'axios';
import { serverUrl } from '../../App';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setCourseData } from '../../redux/courseSlice';



function EditCourses() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const thumb = useRef()
  const [isPublished, setisPublished] = useState(false)
  const [selectCourseData, setselectCourseData] = useState(null)
  const [title, setTitle] = useState("")
  const [subTitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, SetLevel] = useState("")
  const [price, SetPrice] = useState("")
  const [fontendImg, SetFrontendImg] = useState(img)
  const [backendImg, SetBackendImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const dispatch = useDispatch()
  const {courseData} = useSelector(state=>state.course)


  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    SetBackendImg(file)
    SetFrontendImg(URL.createObjectURL(file))
  }

  const getCoursebyId = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, { withCredentials: true })
      setselectCourseData(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (selectCourseData) {
      setTitle(selectCourseData.title || "")
      setSubtitle(selectCourseData.subTitle || "")
      setDescription(selectCourseData.description || "")
      setCategory(selectCourseData.category || "")
      SetLevel(selectCourseData.level || "")
      SetPrice(selectCourseData.price || "")
      SetFrontendImg(selectCourseData.thumbnail || img)
      setisPublished(selectCourseData?.isPublished)
    }
  }, [selectCourseData])

  useEffect(() => {
    getCoursebyId()
  }, [])


  const handleEditCourse = async () => {
    setLoading(true)
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("subTitle", subTitle)
    formdata.append("description", description)
    formdata.append("category", category)
    formdata.append("level", level)
    formdata.append("price", price)
    formdata.append("thumbnail", backendImg)
    formdata.append("isPublished", isPublished)

    try {
      const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`, formdata, { withCredentials: true })
      console.log(result.data)
      setLoading(false)
      const updateData = result.data
      if(updateData.isPublished){
        const updateCourses = courseData.map(c => c._id === courseId ? updateData : c)
        if(!courseData.some(c=>c._id === courseId)){
          updateCourses.push(updateData )
        }
        dispatch(setCourseData(updateCourses))
      }else{
        const filteCourses = courseData.filter(c => c._id !==courseId) 
        dispatch(setCourseData(filteCourses))
      }
      navigate("/courses")
      toast.success("Course Updated")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const handleRemoveCourse = async () => {
    setLoading1(true)
    try {
      const result = await axios.delete(serverUrl + `/api/course/deletecourse/${courseId}`, { withCredentials: true })
      setLoading1(false)
      const filteCourses = courseData.filter(c => c._id !==courseId) 
      dispatch(setCourseData(filteCourses))
      console.log(result.data);
      toast.success("Course Removed")
      navigate("/courses")
    } catch (error) {
      console.log(error)
      setLoading1(false)
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      {/* top bar */}
      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative' >
        <FaArrowLeftLong className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/courses")} />
        <h2 className='text-2xl font-semibold md:pl-[60px] '>Add Details  regarding  the course</h2>
        <div className='space-x-2 space-y-2'>
          <button className='bg-black text-white px-4 py-2 rounded-md' onClick={()=>navigate(`/createlecture/${selectCourseData?._id}`)}>Go to Lecture page</button>
        </div>
      </div>
      {/* form details */}
      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'>
          {!isPublished ? <button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border-1' onClick={() => setisPublished(prev => !prev)}>Click to Publish</button> : <button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1' onClick={() => setisPublished(prev => !prev)}>Click to Unpublish</button>}
          <button className='bg-red-600 text-white px-4 py-2 rounded-md' onClick={handleRemoveCourse} >Remove Course</button>
        </div>

        <form className='space-y-6' onSubmit={(e) => { e.preventDefault() }}>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input type="text" id='title' className='w-full border px-4 py-2 rounded-md' placeholder='Course Title' onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <div>
            <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
            <input type="text" id='subtitle' className='w-full border px-4 py-2 rounded-md' placeholder='Course Subtitle' onChange={(e) => setSubtitle(e.target.value)} value={subTitle} />
          </div>
          <div>
            <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea type="text" id='description' className='w-full border px-4 py-2 rounded-md h-24 resize-none' placeholder='Courese Description' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          </div>

          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
            {/* category */}
            <div className='flex-1 '>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
              <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white' onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="Others">Others</option>
              </select>
            </div>
            {/* level */}
            <div className='flex-1 '>
              <label htmlFor="courselevel" className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white' onChange={(e) => SetLevel(e.target.value)} value={level}>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>

              </select>
            </div>
            {/* for price */}
            <div className='flex-1 '>
              <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1'>Course Price (INR)</label>
              <input type="number" name="" id="price" className='w-full border px-4 py-2 rounded-md' placeholder='₹' onChange={(e) => SetPrice(e.target.value)} value={price} />
            </div>

          </div>
          {/* thumbnail */}
          <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Thumbnail</label>
            <input type="file" hidden ref={thumb} accept='image/*' onChange={handleThumbnail} />
          </div>
          <div className='relative w-[300px] h-[170px] '>
            <img src={fontendImg} alt="" className='w-[100%] h-[100%] border-1 border-black rounded-[5px]' onClick={() => thumb.current.click()} />
            <FaEdit className='w-[20px] h-[20px] absolute top-2 right-2' onClick={() => thumb.current.click()} />
          </div>

          <div className='flex items-center justify-start gap-[15px]'>
            <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 cursor-pointer px-1 py-2 rounded-md' onClick={() => navigate("/courses")}>Cancle</button>
            <button className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer' disabled={loading} onClick={handleEditCourse}>{loading ? <ClipLoader size={30} color='white' /> : "Save"}</button>
          </div>


        </form>




      </div>

    </div>
  )
}

export default EditCourses