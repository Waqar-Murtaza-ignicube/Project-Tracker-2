import React, { Fragment, useEffect, useState } from "react";
import { hours, minutes } from "../utils";
import axios from "axios";

const RegisterHours = ({ getTimesheet }) => {
  const [time, setTime] = useState({
    project: "",
    date: "",
    time_spent: "",
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProjects(token);
    }
    if (time.time_spent !== "") {
      timespent();
    }
  }, [time.time_spent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: value });
  };

  const handleTime = (e) => {
    e.preventDefault();

    const hours = e.target.hours.value;
    const minutes = e.target.minutes.value;

    const minutes_total = `${hours} hours ${minutes} minutes`;
    setTime({ ...time, ["time_spent"]: minutes_total });
  };

  const timespent = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = "http://127.0.0.1:8000/timesheet/";

      const response = await axios.post(url, time, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (response.data) {
        getTimesheet(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async (token) => {
    try {
      const url = "http://127.0.0.1:8000/projects/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-8 bg-white py-5 rounded-md shadow-2xl">
      <form className="flex justify-start px-28 gap-10" action="" onSubmit={handleTime}>
        <div className="flex-col">
          <label className="w-full" htmlFor="project">
            Project
          </label>
          <select
            className="p-2.5 w-full rounded-md mt-1 bg-[#F3F4F6]"
            name="project"
            id="project"
            value={time.project}
            onChange={handleChange}
          >
            <option value="">Select a Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.project_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-col">
          <label htmlFor="date">Date</label>
          <input
            className="p-2 w-full rounded-md mt-1 bg-[#F3F4F6]"
            type="date"
            name="date"
            value={time.date}
            onChange={handleChange}
          />
        </div>
        <div className="flex-col">
          <label htmlFor="time_spent">Time Spent</label>
          <div className="flex gap-3">
            <select
              name="hours"
              id="hours"
              className="p-3 w-full rounded-md mt-1 bg-[#F3F4F6]"
            >
              <option value="0">0h</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}h
                </option>
              ))}
            </select>

            <select
              name="minutes"
              id="minutes"
              className="p-3 w-full rounded-md mt-1 bg-[#F3F4F6]"
            >
              <option value="0">0m</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}m
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="bg-blue-500 shadow-xl pt-2 p-2 rounded-md text-white mt-7 mb-6" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterHours;
