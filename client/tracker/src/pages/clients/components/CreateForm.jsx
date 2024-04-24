import React from "react";
import Button from "../../../components/Button";

const CreateForm = ({handleCreateClient, client, handleChange}) => {
  return (
    <form className="" onSubmit={handleCreateClient}>
      <div className="flex flex-col max-w-full">
        <label className="text-white font-normal" htmlFor="client_name">
          Client Name
        </label>
        <input
          className="p-2 w-full rounded-sm mb-4 mt-1"
          type="text"
          name="client_name"
          value={client.client_name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col max-w-full">
        <label className="text-white font-normal" htmlFor="client_contact">
          Client Contact
        </label>
        <input
          className="p-2 w-full rounded-sm mb-4 mt-1"
          type="text"
          name="client_contact"
          value={client.client_contact}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col max-w-full">
        <label className="text-white font-normal" htmlFor="client_status">
          Client Status
        </label>
        <select
          className="p-3 w-full rounded-sm mb-7 mt-1 bg-white"
          name="client_status"
          id="client_status"
          value={client.client_status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="unactive">Unative</option>
        </select>
      </div>
      <Button />
    </form>
  );
};

export default CreateForm;
