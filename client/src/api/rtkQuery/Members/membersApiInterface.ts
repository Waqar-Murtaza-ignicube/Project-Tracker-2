import { MemberDetails } from "../../../pages/members/membersInterface"

export interface PostMemberRequest {
    members: MemberDetails;
    token: string;
}

export interface DeleteMemberRequest {
    id: number;
    token: string;
}