import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import { usePostloginCredentialsMutation } from "../../../../api/rtkQuery/Accounts/loginApi";
import { ApiResponse } from "../../../../interfaces/globalInterfaces";
import { LoginProps } from "../loginInterface";

const LoginForm: React.FC<LoginProps> = ({ handleChange, loginCreds }) => {
  const navigate = useNavigate();
  const [postLoginCredentials] = usePostloginCredentialsMutation();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
      const { data, error }: ApiResponse = await postLoginCredentials(loginCreds);
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("group", data.group);
        if (data.group == "Admin") {
          navigate("/company");
        } else if (data.group == "Member") {
          navigate("/timesheet");
        } else if (error){
          console.log(error)
        }
      }
  };
  return (
    <form onSubmit={handleLogin}>
      <label className="text-white" htmlFor="email">
        Email
      </label>
      <br />
      <input
        className="p-2 w-full rounded-sm mb-4 mt-1"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={loginCreds.email}
        onChange={handleChange}
      />
      <label className="text-white" htmlFor="password">
        Password
      </label>
      <br />
      <input
        className="p-2 w-full rounded-sm mb-4 mt-1"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={loginCreds.password}
        onChange={handleChange}
      />
      <Button />
    </form>
  );
};

export default LoginForm;
