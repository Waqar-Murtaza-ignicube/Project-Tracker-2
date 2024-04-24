import React from "react";
import Button from "../../../components/Button";

const CreateForm = ({handleChange, handleCreateProject, project, clientsData}) => {
  return (
    <form onSubmit={handleCreateProject}>
      <div className="flex flex-col max-w-full">
        <label className="text-white font-normal" htmlFor="client">
          Client
        </label>
        <select
          className="p-3 w-full rounded-sm mb-4 mt-1 bg-white"
          name="client"
          id="client"
          value={project.client}
          onChange={handleChange}
        >
          <option value="">Select a client</option>
          {clientsData.map((client) => (
            <option key={client.id} value={client.id}>
              {client.client_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col max-w-full">
        <label className="text-white font-normal" htmlFor="project_name">
          Project Name
        </label>
        <input
          className="p-2 w-full rounded-sm mb-4 mt-1"
          type="text"
          name="project_name"
          value={project.project_name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col max-w-full">
        <label className="text-white font-normal" htmlFor="project_deadline">
          Project Deadline
        </label>
        <input
          className="p-2 w-full rounded-sm mb-6 mt-1"
          type="date"
          name="project_deadline"
          value={project.project_deadline}
          onChange={handleChange}
        />
      </div>
      <Button />
    </form>
  );
};

export default CreateForm;
