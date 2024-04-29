import Clients from "./components/Clients";
import { useNavigate } from "react-router-dom";
import { useGetAuthenticatedQuery } from "../../api/rtkQuery/Auth/checkAuth";

const index: React.FC = () => {
  const token = localStorage.getItem("token") as string;
  const group = localStorage.getItem("group");
  const { data: authData, error, isLoading } = useGetAuthenticatedQuery({token});
  const navigate = useNavigate();

  if (isLoading) {
    console.log("in 1st");
    return <div>Loading...</div>;
  } else if (error && group == "Member") {
    console.log("in 2nd");
    navigate("/timesheet");
  } else if (error) {
    console.log("in 3rd");
    navigate("/company");
  }

  return <div>{authData && <Clients />}</div>;
};

export default index;
