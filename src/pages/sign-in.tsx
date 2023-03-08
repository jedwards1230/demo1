import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
	const [error, setError] = useState(null);
	const { signIn, setSession } = useSignIn();
	const [emailAddress, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async () => {
		const response = await signIn!
			.create({
				identifier: emailAddress,
				password,
			})
			.catch((err) => setError(err.errors[0].message));
		setSession!(response!.createdSessionId);
	};

	return (
		<div className="h-full flex gap-y-8 flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">Sign In</h1>
			<div>{error}</div>
			<div className="flex flex-col gap-y-2">
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
						className="border-1 w-1/3 border border-black rounded-lg"
						onClick={handleSignIn}
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
			</div>
		</div>
	);
}
