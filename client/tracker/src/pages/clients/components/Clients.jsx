import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";
import ClientList from "./ClientList";
import { useGetClientsQuery } from "../../../api/rtkQuery/Client/clientApi";

const Clients = () => {
  const [isClients, setIsClients] = useState(false);
  const token = localStorage.getItem("token");
  const {
    data: clientsData,
    error,
    isLoading,
    refetch,
  } = useGetClientsQuery(token);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    } else if (clientsData == "") {
      setIsClients(false);
    } else if (clientsData !== "") {
      setIsClients(true);
    } else if (error) {
      console.log(error);
    }
    refetch();
  }, [isLoading, clientsData, error, refetch]);

  const handleDataChange = () => {
    refetch();
  };

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-white text-2xl font-medium">Clients</h1>
          <Link
            className="bg-blue-500 shadow-xl p-2 rounded-md text-white"
            to="create"
          >
            + Create
          </Link>
        </div>
        {isClients && (
          <ClientList
            myClients={clientsData}
            handleDataChange={handleDataChange}
          />
        )}
        {!isClients && (
          <p className="bg-white rounded-md text-center py-5">
            This view will show clients you are responsible for
          </p>
        )}
      </main>
    </Fragment>
  );
};

export default Clients;
