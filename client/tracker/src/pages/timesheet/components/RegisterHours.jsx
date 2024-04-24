import React, { useEffect, useState } from "react";
import { usePostTimesheetApiMutation } from "../../../api/rtkQuery/Timesheet/timesheetApi";
import CreateForm from "./CreateForm";
import { useDispatch, useSelector } from "react-redux";
import { addTimesheet, resetTimesheet } from "../timesheetSlice";

const RegisterHours = ({ handleDataChange, projectsData }) => {
  const token = localStorage.getItem("token");
  const time = useSelector((store) => store.timesheet);

  const dispatch = useDispatch();
  const [postTimesheetApi] = usePostTimesheetApiMutation();

  useEffect(() => {
    if (time.time_spent !== "") {
      timespent();
    }
    dispatch(resetTimesheet());
  }, [dispatch, time.time_spent, projectsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addTimesheet({ ...time, [name]: value }));
  };

  const handleTime = (e) => {
    e.preventDefault();

    const hours = e.target.hours.value;
    const minutes = e.target.minutes.value;

    const minutes_total = `${hours} hours ${minutes} minutes`;
    dispatch(addTimesheet({ ...time, ["time_spent"]: minutes_total }));
  };

  const timespent = async () => {
    const { data, error } = await postTimesheetApi({ time, token });
    if (data) {
      handleDataChange();
    } else if (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-8 bg-white py-5 rounded-md shadow-2xl">
      <CreateForm
        handleChange={handleChange}
        handleTime={handleTime}
        time={time}
        projectsData={projectsData}
      />
    </div>
  );
};

export default RegisterHours;
