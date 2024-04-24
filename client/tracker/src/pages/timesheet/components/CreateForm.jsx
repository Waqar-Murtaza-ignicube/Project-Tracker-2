import React from "react";
import Button from "../../../components/Button";
import { hours, minutes } from "../../../constants/utils";

const CreateForm = ({handleChange, handleTime, time, projectsData}) => {
  return (
    <form
      className="flex justify-start px-28 gap-10"
      action=""
      onSubmit={handleTime}
    >
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
          {projectsData.map((project) => (
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
      <Button />
    </form>
  );
};

export default CreateForm;
