import React from "react";
import Clients from "./components/Clients";
import { useGetAuthenticatedQuery } from "../../api/rtkQuery/Auth/checkAuth";
import { useNavigate } from "react-router-dom";

const index = () => {
  const token = localStorage.getItem("token");
  const group = localStorage.getItem("group");
  const { data: authData, error, isLoading } = useGetAuthenticatedQuery(token);
  const navigate = useNavigate()

  if (isLoading) {
    console.log("in 1st")
    return <div>Loading...</div>;
  }
  else if (error && group == 'Member'){
    console.log("in 2nd")
    navigate("/timesheet")
  }

  else if (error) {
    console.log("in 3rd")
    navigate("/company")
  }

  return (
    <div>
      {authData && <Clients />}
    </div>
  );
};

export default index;
