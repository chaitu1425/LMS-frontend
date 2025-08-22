import { useEffect } from "react"
import { serverUrl } from "../App"
import axios from "axios"
import { setUserData } from "../redux/userSlice"
import { useDispatch } from 'react-redux'
const getCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true })
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error);
                dispatch(setUserData(null))
            }
        }
        fetchUser()
    }, [])

}

export default getCurrentUser