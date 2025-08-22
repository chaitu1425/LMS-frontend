import{ configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import courseSlice from './courseSlice'
import lectureSlice from './LectureSlice'
import reviewSlice from './reviewSlice'

export const store = configureStore({
    reducer:{
        user:userSlice,
        course:courseSlice,
        lecture:lectureSlice,
        review:reviewSlice
    }
})