import React from "react";
import { useNavigate } from "react-router-dom";
import { usePostloginCredentialsMutation } from "../../../../api/rtkQuery/Accounts/loginApi";
import Button from "../../../../components/Button";

const LoginForm = ({ handleChange, loginCreds }) => {
  const navigate = useNavigate();
  const [postLoginCredentials] = usePostloginCredentialsMutation();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await postLoginCredentials(loginCreds);
      console.log(data);
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("group", data.group);
        if (data.group == "Admin") {
          navigate("/company");
        } else {
          navigate("/timesheet");
        }
      }
    } catch (error){
      console.log( error );
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
