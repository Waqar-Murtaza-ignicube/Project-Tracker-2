import { useNavigate } from "react-router-dom";
import Company from "./components/Company";
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
  } else if (group == "Admin" && authData) {
    navigate("/clients");
  }

  return <div>{group == "Admin" && error && <Company />}</div>;
};

export default index;
