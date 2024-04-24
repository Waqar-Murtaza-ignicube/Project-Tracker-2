import React from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import CreateCompany from "./CreateCompany";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "../companySlice";
import { usePostCompanyApiMutation } from "../../../api/rtkQuery/Company/companyApi";

const Company = () => {
  const company = useSelector((store) => store.company)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postCompanyApi] = usePostCompanyApiMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addCompany({ ...company, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const {data, error} = await postCompanyApi({token, company})
    if (data){
      navigate("/clients");
    }
    else if(error){
      console.log(error)
    }
  };

  return (
    <>
      <Navbar />
      <h1>
        Hi thank you for being a valuable customer! <br /> Before moving you in
        we need some info to adjust your workspace
      </h1>
      <CreateCompany
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        company={company}
      />
    </>
  );
};

export default Company;
