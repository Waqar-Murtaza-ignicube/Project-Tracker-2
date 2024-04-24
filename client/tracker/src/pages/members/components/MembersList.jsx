import React from "react";
import { useDeleteMembersApiMutation } from "../../../api/rtkQuery/Members/membersApi";

const MemberList = ({ myMembers, handleDataChange }) => {
  const [deleteMembersApi] = useDeleteMembersApiMutation() 
  const token = localStorage.getItem("token");

  const deleteMembers = async (id) => {
   await deleteMembersApi({token, id})
   handleDataChange();
  };

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-white text-left flex justify-around rounded-md mb-8 p-5 shadow-2xl">
            <th className="w-40">Name</th>
            <th className="w-40">Email</th>
            <th className="w-40">Project</th>
            <th className="w-40">Role</th>
            <th className="w-40">Action</th>
          </tr>
          </thead>
          <tbody className="bg-white flex flex-col rounded-md p-5 shadow-2xl">
          {myMembers.map((member) => (
            <tr className="text-left flex justify-around py-3" key={member.id}>
              <td className="w-40">{member.member_name}</td>
              <td className="w-40">{member.member_email}</td>
              <td className="w-40">{member.project_name}</td>
              <td className="w-40">{member.member_role}</td>
              <td className="w-40">
                <button className="bg-blue-500 shadow-xl p-2 rounded-md text-white" onClick={() => deleteMembers(member.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MemberList