import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setHasAccess(false);
      navigate("/");
    } else {
      setHasAccess(true);
    }
  }, []);

  const { Component } = props;

  return <div>{hasAccess && <Component />}</div>;
};

export default ProtectedRoutes;
