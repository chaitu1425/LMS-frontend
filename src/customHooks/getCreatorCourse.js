import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setcreatorCourseData } from '../redux/courseSlice'

const getCreatorCourse = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
  return (
    useEffect(()=>{
        const creatorCourses = async()=>{
            try {
                const result = await axios.get(serverUrl + "/api/course/getcreator",{withCredentials:true})
                console.log(result.data)
                dispatch(setcreatorCourseData(result.data))
            } catch (error) {
                console.log(error); 
            }
        }
        creatorCourses()
    },[userData])
  )
}

export default getCreatorCourse