import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
	const { isSignedIn } = useUser();

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex flex-col gap-y-8 w-full h-full items-center justify-center">
				<h1 className="text-6xl font-bold">Home Page</h1>
				{!isSignedIn && (
					<div className="flex gap-x-8">
						<Link href="/sign-in" className="text-2xl font-bold">
							Sign In
						</Link>
						<Link href="/sign-up" className="text-2xl font-bold">
							Sign Up
						</Link>
					</div>
				)}
			</main>
		</>
	);
}
