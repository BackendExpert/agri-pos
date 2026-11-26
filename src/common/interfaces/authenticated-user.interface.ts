import { Types } from "mongoose";

export interface AuthenticatedUser {
    id: string;
    email: string;
    roleId: string;
    role: string;
    accountStatus: string;
    emailVerified: boolean;
    sessionId: string;
    locationId: Types.ObjectId | null;
}