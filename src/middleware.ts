import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/", "/sign-in*", "/sign-up*"];

/**
 * It returns true if the path is public, false otherwise
 * @param {string} path - The path that the user is trying to access.
 * @returns A boolean value.
 */
const isPublic = (path: string) => {
	return publicPaths.find(
		(x) =>
			path.match(new RegExp(`^${x}$`.replace("*$", "($|/)"))) ||
			path.match(/\.svg$/)
	);
};

export default withClerkMiddleware((request: NextRequest) => {
	if (isPublic(request.nextUrl.pathname)) {
		return NextResponse.next();
	}
	// if the user is not signed in redirect them to the sign in page.
	const { userId } = getAuth(request);

	if (!userId) {
		// redirect the users to /pages/sign-in/[[...index]].ts

		const signInUrl = new URL("/sign-up", request.url);
		signInUrl.searchParams.set("redirect_url", request.url);
		return NextResponse.redirect(signInUrl);
	}
	return NextResponse.next();
});

export const config = {
	matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
