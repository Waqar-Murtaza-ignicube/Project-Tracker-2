import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MembersList from "./MembersList"

const Members = () => {
  const navigate = useNavigate();
  const [isMembers, setIsMembers] = useState(false);
  const [allowed, setAllowed] = useState(false)
  const [myMembers, setMyMembers] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const group = localStorage.getItem("group");
    if (group == 'Admin' && token){
      checkAuthentication(token);
    }
    else if (group == 'Member' && token){
      checkMemberAuth(token)
    }
  }, [allowed]);

  const checkAuthentication = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/projects/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data) {
        getMembers(token);
      }
    } catch {
      console.log({ error: "Please create some projects first" });
      setAllowed(true)
      navigate("/projects");
    }
  };

  const getMembers = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/members/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data == "") {
        setIsMembers(false);
      } else if (response.data) {
        setMyMembers(response.data);
        setIsMembers(true);
      }
    } catch (error) {
      setIsMembers(false);
      console.log(error);
    }
  };

  const checkMemberAuth = () => {
    navigate('/timesheet')
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-white text-2xl font-medium">Team Members</h1>
        <Link className="bg-blue-500 shadow-xl p-2 rounded-md text-white" to="invite">+ Invite</Link>
      </div>

      {isMembers && (
        <MembersList myMembers={myMembers} getMembers={getMembers} />
      )}
      {!isMembers && (
        <p className="bg-white rounded-md text-center py-5">This view will show members you are responsible for</p>
      )}
      </main>
    </>
  );
}

export default Members