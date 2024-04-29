import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComponentProp } from "../interfaces/globalInterfaces";

const ProtectedRoutes: React.FC<ComponentProp> = ({Component}) => {
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

  return <div>{hasAccess && <Component />}</div>;
};

export default ProtectedRoutes;
