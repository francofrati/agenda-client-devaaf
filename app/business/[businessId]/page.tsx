"use client"
import { AuthContext } from '@/contexts/authentication/authenticationProvider'
import React, { useEffect , useContext} from 'react'

function Page({params}:{params:{businessId:string}}) {
    const {user} = useContext(AuthContext)
  return (
    <div>{params.businessId}</div>
  )
}

export default Page