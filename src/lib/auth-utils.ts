import { UserRole } from "@/types";

// exact : ["/my-profile", "settings"]
//   patterns: [/^\/dashboard/, /^\/admin/], // Routes starting with /dashboard/* /patient/*
export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/reset-password"],
    patterns: [], // [/password/change-password, /password/reset-password => /password/*]
};

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], // Routes starting with /admin/*
    exact: [], // "/admins"
}

export const userProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/], // Routes starting with /dashboard/*
    exact: [], // "/dashboard"
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    };

    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): "ADMIN" | "USER" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    };
    if (isRouteMatches(pathname, userProtectedRoutes)) {
        return "USER";
    };
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    };
    return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard/overview";
    };
    if (role === "USER") {
        return "/dashboard/overview";
    };
    return "/";
};
