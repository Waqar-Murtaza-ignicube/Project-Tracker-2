import React from "react";
import { useGetAuthenticatedQuery } from "../../api/rtkQuery/Auth/checkAuth";
import { useNavigate } from "react-router-dom";
import Members from "./components/Members";

const index = () => {
  const token = localStorage.getItem("token");
  const group = localStorage.getItem("group");
  const { data: authData, error, isLoading } = useGetAuthenticatedQuery(token);
  const navigate = useNavigate();

  if (error && group == "Member") {
    console.log("in 2nd");
    navigate("/timesheet");
  } else if (error) {
    console.log("in 3rd", error);
    navigate("/company");
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {authData && <Members />}
    </div>
  );
};

export default index;
