import React from "react";
import Button from "../../../components/Button";
import { MemberProps } from "../membersInterface";

const MemberForm: React.FC<MemberProps> = ({
  handleCreateMembers,
  members,
  handleChange,
  projectsData,
}) => {
  return (
    <form onSubmit={handleCreateMembers}>
      <div className="flex flex-col max-w-full">
        <label className="font-normal text-white" htmlFor="member_name">
          Member name
        </label>
        <input
          className="p-2 w-full rounded-sm mb-4 mt-1"
          type="text"
          name="member_name"
          value={members.member_name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col max-w-full">
        <label className="text-white font-normal" htmlFor="member_email">
          Member email
        </label>
        <input
          className="p-2 w-full rounded-sm mb-4 mt-1"
          type="email"
          name="member_email"
          value={members.member_email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col max-w-full">
        <label className="font-normal text-white" htmlFor="member_role">
          Member Role
        </label>
        <select
          className="p-3 w-full rounded-sm mb-4 mt-1 bg-white"
          name="member_role"
          id="member_role"
          value={members.member_role}
          onChange={handleChange}
        >
          <option value="">Select a Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
      </div>
      <div className="flex flex-col max-w-full">
        <label className="font-normal text-white" htmlFor="member_role">
          Project
        </label>
        <select
          className="p-3 w-full rounded-sm mb-6 mt-1 bg-white"
          name="project"
          id="project"
          value={members.project}
          onChange={handleChange}
        >
          <option value="">Select a Project</option>
          {projectsData.map((project) => (
            <option key={project.id} value={project.id}>
              {project.project_name}
            </option>
          ))}
        </select>
      </div>
      <Button />
    </form>
  );
};

export default MemberForm;
