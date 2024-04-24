import axios from "axios";
import React, { useState } from "react";
import { useDeleteTimesheetApiMutation } from "../../../api/rtkQuery/Timesheet/timesheetApi";

const TrackList = ({ myTimesheet, handleDataChange }) => {
  const token = localStorage.getItem("token");
  const [deleteTimesheetApi] = useDeleteTimesheetApiMutation();

  const deleteTimesheet = async (id) => {
    await deleteTimesheetApi({ id, token });
    handleDataChange();
  };
  return (
    <>
      <h2 className="text-white font-medium text-2xl mb-8">Logged Entries</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-white text-left flex justify-around rounded-md mb-8 p-5 shadow-2xl">
            <th className="w-40">Project</th>
            <th className="w-40">Date</th>
            <th className="w-40">Time</th>
            <th className="w-40">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white flex flex-col rounded-md p-5 shadow-2xl">
          {myTimesheet.map((timesheet) => (
            <tr
              className="text-left flex justify-around py-3"
              key={timesheet.id}
            >
              <td className="w-40">{timesheet.project_name}</td>
              <td className="w-40">{timesheet.date}</td>
              <td className="w-40">{timesheet.time_spent}</td>
              <td className="w-40">
                <button
                  className="bg-blue-500 shadow-xl p-2 rounded-md text-white"
                  onClick={() => deleteTimesheet(timesheet.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TrackList;
