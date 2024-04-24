import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import CreateForm from "./CreateForm";
import { useNavigate } from "react-router-dom";
import { usePostClientsApiMutation } from "../../../api/rtkQuery/Client/clientApi";
import { useDispatch, useSelector } from "react-redux";
import { addClient, resetClient } from "../clientSlice";

const CreateClient = () => {
  const client = useSelector((store) => store.client);

  const navigate = useNavigate();
  const [postClientsApi] = usePostClientsApiMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetClient());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addClient({ ...client, [name]: value }));
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await postClientsApi({ token, client });
    navigate("/clients");
  };

  return (
    <>
      <Navbar />
      <section className="flex justify-center">
        <div className="p-10 m-20 shadow-2xl rounded-lg w-1/4 ">
          <h1 className="text-white text-4xl mb-7 font-semibold ">
            New Client
          </h1>
          <CreateForm
            handleCreateClient={handleCreateClient}
            client={client}
            handleChange={handleChange}
          />
        </div>
      </section>
    </>
  );
};

export default CreateClient;
