import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ClientList from "./ClientList";

const Clients = () => {
  const navigate = useNavigate();
  const [isClients, setIsClients] = useState(false);
  const [allowed, setAllowed] = useState(false)
  const [myClients, setMyClients] = useState({});

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
      const url = "http://127.0.0.1:8000/company/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data) {
        getClients(token);
      }
    } catch {
      console.log({ error: "Please create a company" });
      setAllowed(true)
      navigate("/company");
    }
  };

  const checkMemberAuth = () => {
    navigate("/timesheet");
  }

  const getClients = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/clients/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data == "") {
        setIsClients(false);
      } else if (response.data) {
        setMyClients(response.data);
        setIsClients(true);
      }
    } catch (error) {
      setIsClients(false);
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-white text-2xl font-medium">Clients</h1>
          <Link className="bg-blue-500 shadow-xl p-2 rounded-md text-white" to="create">+ Create</Link>
        </div>
        {isClients && (
          <ClientList myClients={myClients} getClients={getClients} />
        )}
        {!isClients && (
          <p className="bg-white rounded-md text-center py-5">This view will show clients you are responsible for</p>
        )}
      </main>
    </Fragment>
  );
};

export default Clients;
