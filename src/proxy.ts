import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { UserRole } from './types';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from './lib/auth-utils';
import { verifyToken } from './lib/jwtHandlers';
import { deleteCookie, getCookie, getNewAccessToken } from './lib/cookies-tokens';



export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const hasTokenRefreshedParam = request.nextUrl.searchParams.has('tokenRefreshed');

    // If coming back after token refresh, remove the param and continue
    if (hasTokenRefreshedParam) {
        const url = request.nextUrl.clone();
        url.searchParams.delete('tokenRefreshed');
        return NextResponse.redirect(url);
    };

    const tokenRefreshResult = await getNewAccessToken();

    // If token was refreshed, redirect to same page to fetch with new token
    if (tokenRefreshResult?.tokenRefreshed) {
        const url = request.nextUrl.clone();
        url.searchParams.set('tokenRefreshed', 'true');
        return NextResponse.redirect(url);
    };

    const token = await getCookie("token") || null;

    let userRole: UserRole | null = null;
    if (token) {
        const verifiedToken = await verifyToken(token.value as string);

        if (!verifiedToken.success) {
            await deleteCookie("token");
            await deleteCookie("refreshToken");
            return NextResponse.redirect(new URL('/login', request.url));
        };

        userRole = verifiedToken.payload!.role;
    };

    const routeOwner = getRouteOwner(pathname);

    const isAuth = isAuthRoute(pathname);

    // Rule 1 : User is logged in and trying to access auth route. Redirect to default dashboard
    if (token && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    };


    // Rule 2: Handle /reset-password route BEFORE checking authentication
    if (pathname === "/reset-password") {
        const email = request.nextUrl.searchParams.get("email");
        const resetToken = request.nextUrl.searchParams.get("token");

        // Coming from email reset link (has email and token)
        if (email && resetToken) {
            try {
                // Verify the token
                const verifiedToken = await verifyToken(resetToken);

                if (!verifiedToken.success) {
                    return NextResponse.redirect(new URL('/forgot-password?error=expired-link', request.url));
                };

                // Verify email matches token
                if (verifiedToken.success && verifiedToken.payload!.email !== email) {
                    return NextResponse.redirect(new URL('/forgot-password?error=invalid-link', request.url));
                };

                // Token and email are valid, allow access without authentication
                return NextResponse.next();
            } catch {
                // Token is invalid or expired
                return NextResponse.redirect(new URL('/forgot-password?error=expired-link', request.url));
            }
        };

        if (!token) {
            return NextResponse.redirect(new URL('/forgot-password', request.url));
        } else {
            return NextResponse.redirect(new URL('/my-profile', request.url));
        }
    };


    // Rule 3 : User is trying to access open public route
    if (routeOwner === null) {
        return NextResponse.next();
    };


    // Rule 4 : User is trying to access any protected route
    if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    };

    // Rule 5 : User is trying to access common protected route
    if (routeOwner === "COMMON") {
        return NextResponse.next();
    };

    // Rule 6 : User is trying to access role based protected route
    if (routeOwner === "ADMIN" || routeOwner === "USER") {
        if (userRole !== routeOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        };
    };

    return NextResponse.next();
};



export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
};