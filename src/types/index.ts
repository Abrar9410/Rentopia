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
    phone: string;
    picture?: string;
    address: string;
    earnings: number;
    isDeleted: boolean;
    isActive: IsActive;
    isVerified: boolean;
    role: UserRole;
    auths: IAuthProvider[];
    createdAt: string;
    updatedAt: string;
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
    startDate: string;
    endDate: string;
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
    ownerRole: UserRole;
    location: string;
    adv_bookings: Adv_Booking[] | [];
    createdAt: string;
    updatedAt: string;
    deleteImages?: string[];
};

export enum ORDER_STATUS {
    // REQUESTED = "REQUESTED",
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
};

export interface IOrder {
    _id: string;
    renter: Partial<IUser>; 
    item: IItem;
    owner: Partial<IUser>;
    payment: Partial<IPayment>;
    startDate: string;
    endDate: string;
    status: ORDER_STATUS;
    ownerEarning: number;
    platformFee: number;
    createdAt: string;
    updatedAt: string;
};

export enum PAYMENT_STATUS {
    PAID = "PAID",
    UNPAID = "UNPAID",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
};

export interface IPayment {
    _id: string;
    order: Partial<IOrder>;
    transactionId: string;
    amount: number;
    paymentGatewayData: unknown;
    invoiceUrl?: string
    status: PAYMENT_STATUS
};