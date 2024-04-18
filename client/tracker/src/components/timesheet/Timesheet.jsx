import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import RegisterHours from './RegisterHours'
import TrackList from './TrackList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Timesheet = () => {

  const [isTimesheet, setIsTimesheet] = useState(false)
  const [myTimesheet, setMyTimesheet] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const group = localStorage.getItem('group')
    if (group == 'Admin' && token){
      checkAuthentication(token)
    }else{
      getTimesheet(token)
    }
  },[])

  const checkAuthentication = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/company/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data) {
        getTimesheet(token)
      }
    } catch {
      console.log({ error: "Please create some clients first" });
      navigate("/company");
    }
  };

  const getTimesheet = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/timesheet/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data == "") {
        setIsTimesheet(false);
      } else if (response.data) {
        setMyTimesheet(response.data);
        setIsTimesheet(true);
      }
    } catch (error) {
      setIsTimesheet(false);
      console.log(error);
    } 
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-white text-2xl font-medium">Register Hours</h1>
        </div>
        <RegisterHours getTimesheet={getTimesheet}/>
        {isTimesheet && (
          <TrackList myTimesheet={myTimesheet} getTimesheet={getTimesheet}/>
        )}
        {!isTimesheet && (
          <p className="bg-white rounded-md text-center py-5">Your daily project entries will be displayed here.</p>
        )}
      </main>
    </>
  )
}

export default Timesheet