import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";
import ProjectList from "./ProjectList"
import { useGetProjectQuery } from "../../../api/rtkQuery/Project/projectApi";

const Projects = () => {
  const [isProjects, setIsProjects] = useState(false);
  const token = localStorage.getItem('token')
  const {data: projectsData, error, refetch} = useGetProjectQuery(token)

  useEffect(()=>{
    if (projectsData == ''){
      console.log("in 2nd")
      setIsProjects(false);
    }
    else if (projectsData) {
      setIsProjects(true);
    }
    else if (error) {
      console.log(error);
    }
    refetch();
  },[projectsData, error, refetch])

  const handleDataChange = () => {
    refetch();
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-white text-2xl font-medium">Projects</h1>
        <Link className="bg-blue-500 shadow-xl p-2 rounded-md text-white" to="create">+ Create</Link>
      </div>
        {isProjects && (
          <ProjectList myProjects={projectsData} handleDataChange={handleDataChange}/>
        )}
        {!isProjects && (
          <p className="bg-white text-center py-5 rounded-md">This view will show Projects you are responsible for</p>
        )}
      </main>
    </>
  );
}

export default Projects