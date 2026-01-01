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

export enum Category {
    ELECTRONICS = "Electronics",
    FURNITURE = "Furniture",
    TOOLS = "Tools",
    SPORTS = "Sports",
    HOME_APPLIANCES = "Home Appliances",
    BOOKS = "Books",
    OTHERS = "Others"
};

export enum Current_Status {
    AVAILABLE = "AVAILABLE",
    OCCUPIED = "OCCUPIED",
    UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
    FLAGGED = "FLAGGED",
    BLOCKED = "BLOCKED"
};

export interface Adv_Booking {
    startDate: Date;
    endDate: Date;
};

export interface IItem {
    _id: string;
    title: string;
    description: string;
    specifications: string[];
    category: Category;
    images: string[];
    pricePerDay: number;
    available: boolean;
    current_status: Current_Status;
    owner: IUser;
    location: string;
    adv_bookings: Adv_Booking[] | [];
    createdAt: Date;
    updatedAt: Date;
    deleteImages?: string[];
};