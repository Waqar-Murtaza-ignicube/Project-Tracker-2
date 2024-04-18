import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false)

  const [company, setCompany] = useState({
    company_name: "",
    company_employees: 10,
    company_type: "software company",
    country: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const group = localStorage.getItem("group");
    if (group == 'Admin' && token){
      checkAuthentication(token);
    }
    else if (group == 'Member' && token){
      checkMemberAuth(token)
    }
  }, [allowed]);

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
      setAllowed(true)
      navigate("/company");
    }
  };

  const checkMemberAuth = () => {
    navigate('/timesheet')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const url = "http://127.0.0.1:8000/company/";
      const response = await axios.post(url, company, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.statusText);
      navigate("/clients");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <h1>
        Hi thank you for being a valuable customer! <br /> Before moving you in
        we need some info to adjust your workspace
      </h1>
      <form onSubmit={handleSubmit}>
        <h2>Enter Company Details </h2>
        <label htmlFor="company_name">Company Name</label>
        <input
          type="text"
          name="company_name"
          id="company_name"
          value={company.company_name}
          onChange={handleChange}
        />
        <label htmlFor="company_employees">Company Employees</label>
        <input
          type="number"
          name="company_employees"
          id="company_employees"
          value={company.company_employees}
          onChange={handleChange}
        />
        <label htmlFor="company_type">Company Type</label>
        <select
          name="company_type"
          id="company_type"
          value={company.company_type}
          onChange={handleChange}
        >
          <option value="software company">Software Company</option>
          <option value="trading agency">Trading Agency</option>
          <option value="media agency">Media Agency</option>
        </select>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          id="country"
          value={company.country}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Company;
