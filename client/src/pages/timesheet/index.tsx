import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timesheet from "./components/Timesheet";
import { useGetAuthenticatedQuery } from "../../api/rtkQuery/Auth/checkAuth";

const index: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const token = localStorage.getItem("token") as string;
  const group = localStorage.getItem("group");

  const { error, isLoading } = useGetAuthenticatedQuery({token});
  const navigate = useNavigate();

  useEffect(() => {
    if (error && token && group == "Admin") {
      setIsAuth(false);
      navigate("/company");
    } else if (token) {
      setIsAuth(true);
    }
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isAuth && <Timesheet />}
    </div>
  );
};

export default index;
