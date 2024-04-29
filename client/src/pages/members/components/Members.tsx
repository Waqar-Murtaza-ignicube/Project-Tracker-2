import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";
import MembersList from "./MembersList";
import { useGetMembersQuery } from "../../../api/rtkQuery/Members/membersApi";

const Members: React.FC = () => {
  const [isMembers, setIsMembers] = useState<boolean>(false);
  const token = localStorage.getItem("token") as string;
  const { data: membersData, error, refetch } = useGetMembersQuery({token});

  useEffect(() => {
    if (membersData == "") {
      console.log("in 2nd");
      setIsMembers(false);
    } else if (membersData) {
      setIsMembers(true);
    } else if (error) {
      console.log(error);
    }
    refetch();
  }, [membersData, error, refetch]);

  const handleDataChange = () => {
    refetch();
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-white text-2xl font-medium">Team Members</h1>
          <Link
            className="bg-blue-500 shadow-xl p-2 rounded-md text-white"
            to="invite"
          >
            + Invite
          </Link>
        </div>

        {isMembers && (
          <MembersList
            myMembers={membersData}
            handleDataChange={handleDataChange}
          />
        )}
        {!isMembers && (
          <p className="bg-white rounded-md text-center py-5">
            This view will show members you are responsible for
          </p>
        )}
      </main>
    </>
  );
};

export default Members;
