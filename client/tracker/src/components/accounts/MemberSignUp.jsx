import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IMG from "../../assets/landing-page-login.jpg";

const MemberSignUp = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const url = "http://127.0.0.1:8000/membersignup/";
      const response = await axios.post(url, credentials);
      console.log(response.statusText);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="p-20">
      <div className="flex rounded-lg shadow-2xl justify-center">
        <div className="w-3/6">
          <img
            className="rounded-tl-lg rounded-bl-lg w-full h-full object-cover"
            src={IMG}
            alt=""
          />
        </div>
        <div className="w-3/6 p-10">
          <h1 className="text-white text-4xl mb-4 font-semibold">Sign Up</h1>
          <p className="text-white font-medium mb-7">
            Sign up now to unlock powerful features and elevate your team's
            productivity.
          </p>
          <form onSubmit={handleSignup}>
            <div className="flex items-center gap-5 justify-between">
              <div className="flex-col w-3/6">
                <label className="text-white" htmlFor="username">
                  Username
                </label>
                <input
                  className="p-2 w-full rounded-sm mb-4 mt-1"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-col w-3/6">
                <label className="text-white" htmlFor="email">
                  Email
                </label>
                <input
                  className="p-2 w-full rounded-sm mb-4 mt-1"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              className="p-2 w-full rounded-sm mb-4 mt-1"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
            />
            <label className="text-white" htmlFor="confirm_password">
              Confirm Password
            </label>
            <input
              className="p-2 w-full rounded-sm mb-4 mt-1"
              type="password"
              name="confirm_password"
              placeholder="Re-enter your password"
              value={credentials.confirm_password}
              onChange={handleChange}
            />
            <button
              className="bg-blue-500 shadow-xl pt-2 p-2 rounded-md text-white mt-3 mb-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MemberSignUp;
