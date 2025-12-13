export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
};

export interface IAuthProvider {
    provider: "google" | "credentials";   //"Google", "Credential"
    providerId: string
};

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
};

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    phone: string;
    picture?: string;
    address: string;
    earnings?: number;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    role: UserRole;
    auths: IAuthProvider[];
    createdAt?: Date;
    updatedAt?: Date;
};