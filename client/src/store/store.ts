import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../pages/accounts/Login/loginSlice";
import memberSignupSlice from "../pages/accounts/Member/memberSignupSlice";
import registerSlice from "../pages/accounts/Register/registerSlice";
import clientSlice from "../pages/clients/clientSlice";
import companySlice from "../pages/company/companySlice";
import membersSlice from "../pages/members/membersSlice";
import timesheetSlice from "../pages/timesheet/timesheetSlice";
import projectsSlice from "../pages/projects/projectsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminAuth } from "../api/rtkQuery/Auth/checkAuth"
import { loginApi } from "../api/rtkQuery/Accounts/loginApi";
import { logoutApi } from "../api/rtkQuery/Accounts/logoutApi";
import { getClientsApi } from "../api/rtkQuery/Client/clientApi";
import { getProjectApi } from "../api/rtkQuery/Project/projectApi";
import { getMembersApi } from "../api/rtkQuery/Members/membersApi";
import { getTimesheetApi } from "../api/rtkQuery/Timesheet/timesheetApi";
import { getCompanyApi } from "../api/rtkQuery/Company/companyApi";
import { registerApi } from "../api/rtkQuery/Accounts/registerApi";
import { memberSignupApi } from "../api/rtkQuery/Accounts/memberSignupApi";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    member: memberSignupSlice,
    register: registerSlice,
    client: clientSlice,
    company: companySlice,
    members: membersSlice,
    timesheet: timesheetSlice,
    projects: projectsSlice,
    [loginApi.reducerPath]: loginApi.reducer,
    [logoutApi.reducerPath]: logoutApi.reducer,
    [adminAuth.reducerPath]: adminAuth.reducer,
    [getClientsApi.reducerPath]: getClientsApi.reducer,
    [getProjectApi.reducerPath]: getProjectApi.reducer,
    [getMembersApi.reducerPath]: getMembersApi.reducer,
    [getTimesheetApi.reducerPath]: getTimesheetApi.reducer,
    [getCompanyApi.reducerPath]: getCompanyApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [memberSignupApi.reducerPath]: memberSignupApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      logoutApi.middleware,
      adminAuth.middleware,
      getClientsApi.middleware,
      getProjectApi.middleware,
      getMembersApi.middleware,
      getTimesheetApi.middleware,
      getCompanyApi.middleware,
      registerApi.middleware,
      memberSignupApi.middleware
    ),
});

setupListeners(store.dispatch);
