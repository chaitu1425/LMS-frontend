import { createSlice } from "@reduxjs/toolkit";


const lectureSlice = createSlice({
    name: "lecture",
    initialState:{
        lectureData:[]
    },
     reducers:{
        setlectureData:(state,action)=>{
            state.lectureData = action.payload
        }
     }
})

export const {setlectureData} = lectureSlice.actions
export default lectureSlice.reducer
