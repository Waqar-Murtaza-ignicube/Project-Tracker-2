import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useGetProjectQuery } from "../../../api/rtkQuery/Project/projectApi";
import { usePostMembersApiMutation } from "../../../api/rtkQuery/Members/membersApi";
import MemberForm from "./MemberForm";
import { useDispatch, useSelector } from "react-redux";
import { addMembers } from "../membersSlice";

const InviteMember = () => {
  const [hasProjects, setHasProjects] = useState(false);
  const token = localStorage.getItem("token");
  const members = useSelector((store) => store.members);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: projectsData, error, isLoading } = useGetProjectQuery(token);
  const [postMembersApi] = usePostMembersApiMutation();

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    } else if (projectsData == "") {
      console.log("in 2nd");
      setHasProjects(false);
    } else if (projectsData) {
      setHasProjects(true);
    } else if (error) {
      console.log(error);
    }
  }, [isLoading, projectsData, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addMembers({ ...members, [name]: value }));
  };

  const handleCreateMembers = async (e) => {
    e.preventDefault();

    const { data, error } = await postMembersApi({ members, token });
    if (data) {
      navigate("/members");
    } else if (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <section className="flex justify-center">
        {hasProjects && (
          <div className="p-10 m-20 shadow-2xl rounded-lg w-1/4 ">
            <h1 className="text-white text-4xl mb-7 font-semibold ">
              Invite Member
            </h1>

            <MemberForm
              handleChange={handleChange}
              handleCreateMembers={handleCreateMembers}
              projectsData={projectsData}
              members={members}
            />
          </div>
        )}
        {!hasProjects && (
          <p className="bg-white rounded-md text-center mt-10 p-5">
            Please create some projects first to add a new member
          </p>
        )}
      </section>
    </>
  );
};

export default InviteMember;
