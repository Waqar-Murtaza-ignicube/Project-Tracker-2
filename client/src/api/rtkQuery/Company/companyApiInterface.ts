import { CompanyDetails } from "../../../pages/company/companyInterface";

export interface CompanyPostRequest {
    company: CompanyDetails;
    token: string;
}