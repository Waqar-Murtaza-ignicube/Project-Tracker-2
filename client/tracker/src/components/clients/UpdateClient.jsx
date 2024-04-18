import React, { useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState({
    client_name: "",
    client_contact: "",
    client_status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const url = `http://127.0.0.1:8000/clients/${id}/`;
      const response = await axios.put(url, client, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      navigate("/clients");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <section className="flex justify-center">
        <div className="p-10 m-20 shadow-2xl rounded-lg w-1/4 ">
          <h1 className="text-white text-4xl mb-7 font-semibold ">Update Client</h1>
          <form onSubmit={handleUpdateClient}>
            <label className="text-white font-normal" htmlFor="client_name">Client Name</label>
            <input className="p-2 w-full rounded-sm mb-4 mt-1"
              type="text"
              name="client_name"
              value={client.client_name}
              onChange={handleChange}
            />
            <label className="text-white font-normal" htmlFor="client_contact">Client Contact</label>
            <input className="p-2 w-full rounded-sm mb-4 mt-1"
              type="text"
              name="client_contact"
              value={client.client_contact}
              onChange={handleChange}
            />
            <label className="text-white font-normal" htmlFor="client_status">Client Status</label>
            <select className="p-3 w-full rounded-sm mb-6 mt-1 bg-white"
              name="client_status"
              id="client_status"
              value={client.client_status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="unactive">Unative</option>
            </select>
            <button className="bg-blue-500 shadow-xl p-2 rounded-md text-white" type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateClient;
