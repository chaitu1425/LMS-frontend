import React from 'react'
import { Navigate, Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
export const serverUrl="http://localhost:8000"
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Forgotpass from './pages/Forgotpass'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/educator/Dashboard'
import Courses from './pages/educator/Courses'
import EditCourses from './pages/educator/EditCourses'
import CreateCourses from './pages/educator/CreateCourses'
import getCreatorCourse from './customHooks/getCreatorCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Educator/CreateLecture'
import EditLecture from './pages/Educator/EditLecture'
import ViewCourse from './pages/Educator/ViewCourse'
import Scrolltotop from './component/Scrolltotop'
import ViewLectures from './pages/ViewLectures'
import MyEnrolledCourse from './pages/MyEnrolledCourse'
import getAllReviews from './customHooks/getAllReviews'
import SearchWithAI from './pages/SearchWithAI'
function App() {
  getCurrentUser()
  getCreatorCourse()
  getPublishedCourse()
  getAllReviews()
  
  const {userData} = useSelector(state=>state.user)
  return (
    <>
      <ToastContainer/>
      <Scrolltotop />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={!userData ? <Signup/> : <Navigate to={"/"} />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={ userData ? <Profile/> : <Navigate to={"/signup"}/>}/>
        <Route path='/forgot' element={ userData ? <Forgotpass/> : <Navigate to={"/signup"}/>}/>
        <Route path='/editprofile' element={ userData ? <EditProfile/> : <Navigate to={"/signup"}/>}/>
        <Route path='/allcourses' element={ userData ? <AllCourses/> : <Navigate to={"/signup"}/>}/>

        <Route path='/dashboard' element={ userData?.role === "educator"? <Dashboard/> : <Navigate to={"/signup"}/>}/>
        <Route path='/courses' element={ userData?.role === "educator"? <Courses/> : <Navigate to={"/signup"}/>}/>
        <Route path='/createcourse' element={ userData?.role === "educator"? <CreateCourses/> : <Navigate to={"/signup"}/>}/>
        <Route path='/editcourse/:courseId' element={ userData?.role === "educator"? <EditCourses/> : <Navigate to={"/signup"}/>}/>

        
        <Route path='/createlecture/:courseId' element={ userData?.role === "educator"? <CreateLecture/> : <Navigate to={"/signup"}/>}/>
        <Route path='/editlecture/:courseId/:lectureId' element={ userData?.role === "educator"? <EditLecture/> : <Navigate to={"/signup"}/>}/>
        <Route path='/viewcourse/:courseId' element={ userData? <ViewCourse/> : <Navigate to={"/signup"}/>}/>

        <Route path='/viewlecture/:courseId' element={ userData? <ViewLectures/> : <Navigate to={"/signup"}/>}/>
        <Route path='/mycourses' element={ userData? <MyEnrolledCourse/> : <Navigate to={"/signup"}/>}/>
        <Route path='/search' element={ userData? <SearchWithAI/> : <Navigate to={"/signup"}/>}/>


      </Routes> 
    </>
  )
}

export default App