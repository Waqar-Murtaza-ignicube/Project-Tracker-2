import { ChangeHandler, SubmitHandler } from "../../types/globalTypes";

export interface CompanyDetails {
  company_name: string;
  company_employees: number;
  company_type: string;
  country: string;
}

export interface CompanyProps {
    handleSubmit: SubmitHandler
    handleChange: ChangeHandler
    company: CompanyDetails
}