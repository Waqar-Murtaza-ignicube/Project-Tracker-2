import axios from "axios";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const ClientList = ({ myClients, getClients }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const deleteClients = async (id) => {
    try {
      const url = `http://127.0.0.1:8000/clients/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      getClients(token);
    } catch (error) {
      console.log(error);
    }
  };

  const updateClients = (id) => {
    navigate(`update/${id}`);
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="bg-white text-left flex justify-around rounded-md mb-8 p-5 shadow-2xl">
            <th className="w-40">Name</th>
            <th className="w-40">Contact No.</th>
            <th className="w-40">Status</th>
            <th className="w-40">Action</th>
            <th className="w-40">Action</th>
            </tr>
        </thead>
        <tbody className="bg-white flex flex-col rounded-md p-5 shadow-2xl">
          {myClients.map((client) => (
            <tr className="text-left flex justify-around py-3" key={client.client_name}>
              <td className=" w-40">{client.client_name}</td>
              <td className=" w-40">{client.client_contact}</td>
              <td className=" w-40">{client.client_status}</td>
              <td className=" w-40">
                <button className="bg-blue-500 shadow-xl p-2 rounded-md text-white" onClick={() => updateClients(client.id)}>Edit</button>
              </td>
              <td className="w-40">
                <button className="bg-blue-500 shadow-xl p-2 rounded-md text-white" onClick={() => deleteClients(client.id)}>Delete</button>
              </td>
            </tr>
            ))} 
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
