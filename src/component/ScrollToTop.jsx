import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Scrolltotop() {
  const pathname = useLocation()

  useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'})
  },[pathname])
}

export default Scrolltotop