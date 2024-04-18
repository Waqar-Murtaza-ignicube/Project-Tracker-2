import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IMG from "../../assets/landing-page-login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const group = localStorage.getItem("group");
    if (group == "Admin" && token) {
      checkAuthentication(token);
    } else if (group == "Member" && token) {
      checkMemberAuth();
    }
  }, []);

  const checkAuthentication = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/company/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data) {
        navigate("/clients");
      }
    } catch {
      console.log({ error: "Please create a company" });
      navigate("/company");
    }
  };

  const checkMemberAuth = () => {
    navigate("/timesheet");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = "http://127.0.0.1:8000/login/";
      const response = await axios.post(url, credentials);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("group", response.data.group);
      if (response.data.group == "Admin") {
        checkAuthentication(response.data.token);
      } else {
        checkMemberAuth();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='p-20'>
      <div className="flex rounded-lg shadow-2xl justify-center">
        <div className="w-3/6">
          <img className="rounded-tl-lg rounded-bl-lg w-full h-full object-cover" src={IMG} alt="" />
        </div>
        <div className="w-3/6 p-10">
          <h1 className="text-white text-4xl mb-4 font-semibold">Login</h1>
          <p className="text-white font-medium mb-7">
            Sign in now to optimize your workflow and maximize productivity with
            ease.
          </p>
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
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleChange}
            />
            <button
              className="bg-blue-500 shadow-xl pt-2 p-2 rounded-md text-white mt-3 mb-4"
              type="submit"
            >
              Submit
            </button>
          </form>
          <p className="text-white">
            Don't have an account?{" "}
            <a className="underline" href="register/">
              Create one
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
