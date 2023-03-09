import { useSignIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function SignIn() {
	const { signIn, setSession } = useSignIn();
	const { isSignedIn } = useUser();
	const router = useRouter();

	const [error, setError] = useState("");
	const [emailAddress, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		signIn!
			.create({
				identifier: emailAddress,
				password,
			})
			.then((response) => {
				console.log(response);
				setSession!(response.createdSessionId);
			})
			.catch((err) => {
				console.log(err);
				setError("Invalid email or password.");
			});
	};

	useEffect(() => {
		if (isSignedIn) {
			router.push("/");
		}
	}, [isSignedIn, router]);

	return (
		<div className="h-full flex gap-y-8 flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">Sign In</h1>
			{error && <div>{error}</div>}
			<form onSubmit={handleSignIn} className="flex flex-col gap-y-2">
				<input
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="flex justify-between">
					<button
						type="submit"
						className="border-1 w-1/3 border border-black rounded-lg"
					>
						Submit
					</button>
					<Link
						className="border-1 w-1/3 text-center border border-black rounded-lg"
						href="/sign-up"
					>
						Go To Sign Up
					</Link>
				</div>
			</form>
		</div>
	);
}
