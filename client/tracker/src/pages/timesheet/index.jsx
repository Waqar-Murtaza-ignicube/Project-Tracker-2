import React, { useEffect, useState } from "react";
import { useGetAuthenticatedQuery } from "../../api/rtkQuery/Auth/checkAuth";
import { useNavigate } from "react-router-dom";
import Timesheet from "./components/Timesheet";

const index = () => {
  const token = localStorage.getItem("token");
  const group = localStorage.getItem("group");
  const { data: authData, error, isLoading } = useGetAuthenticatedQuery(token);
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    if(error && token && group == 'Admin'){
      setIsAuth(false)
      navigate("/company")
    }else if (token){
      setIsAuth(true)
    }
  })

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isAuth && <Timesheet />}
    </div>
  );
};

export default index;
