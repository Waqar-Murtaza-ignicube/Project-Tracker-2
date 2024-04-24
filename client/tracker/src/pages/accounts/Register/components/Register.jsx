import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IMG from "../../../../assets/landing-page-login.jpg";
import RegisterForm from "./RegisterForm";
import { registerUser } from "../registerSlice";
import {useNavigate} from "react-router-dom"
import { usePostRegisterCredentialsMutation } from "../../../../api/rtkQuery/Accounts/registerApi";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const registerCreds = useSelector((store) => store.register);

  const [postRegisterCredentials] = usePostRegisterCredentialsMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(registerUser({ ...registerCreds, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {data} = await postRegisterCredentials(registerCreds)
    if (data){
      navigate("/login");
    }
  };

  return (
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
        <RegisterForm
          handleChange={handleChange}
          handleSignup={handleSignup}
          registerCreds={registerCreds}
        />
      </div>
    </div>
  );
};

export default Register;
