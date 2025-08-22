import React, { useEffect, useState } from 'react'
import Nav from "../component/Nav"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import img from "../assets/SearchAi.png"
import { useSelector } from 'react-redux';
import Card from '../component/Card';


function AllCourses() {
    const navigate = useNavigate()
    const {courseData} = useSelector(state=>state.course)
    const [category,setCategory] = useState([])
    const [filteCourses,setFilterCourse] = useState([])
    const [sideBarVisible,setSideBarVisible] = useState(false)
    const toggleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=>prev.filter(c => c !== e.target.value))
        }else{
            setCategory(prev => [...prev,e.target.value])
        }
    }

    const applyFilter = () =>{
        let CourseCopy = courseData?.slice()
        if(category.length > 0){
            CourseCopy = CourseCopy.filter(c => category.includes(c.category))
        }
        setFilterCourse(CourseCopy)
    }

    useEffect(()=>{
        setFilterCourse(courseData)
    },[courseData])

    useEffect(()=>{
        applyFilter()
    },[category])

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <Nav />
            <button className='fixed top-20 left-4 z-50  bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black' onClick={()=>setSideBarVisible(prev=>!prev)} >
                {sideBarVisible? 'Hide':'Show'} Filter
            </button>
            {/* side bar */}
            <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${sideBarVisible ? "translate-x-0":"-translate-x-full"} md:block md:translate-x-0`} >
                <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'>
                    <FaArrowLeftLong className='text-white' onClick={() => navigate("/")} /> Filter by Category</h2>
                <form action="" className='space-y-4 text-sm bg-gray-600 border-white text-[white] border p-[20px] rounded-2xl' onSubmit={(e) => e.preventDefault()}>
                    <button className='px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer' onClick={()=>navigate("/search")}>Search With AI <img src={img} className='w-[30px] h-[30px] rounded-full' alt="" /></button>
                    <label htmlFor="" className='flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'App Development'} />App Development
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={'AI/ML'}  />AI/ML
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={'AI Tools'} />AI Tools
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={'Data Science'} />Data Science
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={'Data Analytics'} />Data Analytics
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={'Ethical Hacking'} />Ethical Hacking
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={'UI UX Designing'} />UI UX Designing
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={'Web Development'} />Web Development
                    </label>

                    <label htmlFor="" className='flex items-center gap-3  cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md'onChange={toggleCategory} value={'Others'} />Others
                    </label>

                </form>
            </aside>

            <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]'>
                {
                    filteCourses?.map((course,index)=>(
                        <Card key={index} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id} reviews={course.reviews}/>
                    ))
                }
            </main>


        </div>
    )
}

export default AllCourses