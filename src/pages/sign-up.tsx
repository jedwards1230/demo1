import { useSignUp, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignUp() {
	const { signUp, setSession } = useSignUp();
	const { isSignedIn } = useUser();
	const router = useRouter();

	const [error, setError] = useState(null);
	const [waitingForCode, setWaitingForCode] = useState(false);
	const [oneTimeCode, setOneTimeCode] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		await signUp!
			.create({
				emailAddress,
				password,
			})
			.catch((err) => setError(err.errors[0].message));

		// Prepare the verification process for the email address.
		// This method will send a one-time code to the email address supplied to
		// the current sign-up.
		await signUp!
			.prepareEmailAddressVerification()
			.catch((err) => setError(err.errors[0].message));
		setWaitingForCode(true);
	};

	const handleCodeSubmit = async () => {
		// Attempt to verify the email address by supplying the one-time code that
		// was sent in the previous step.
		const response = await signUp!
			.attemptEmailAddressVerification({
				code: oneTimeCode,
			})
			.catch((err) => setError(err.errors[0].message));

		setSession!(response!.createdSessionId);
	};

	useEffect(() => {
		if (isSignedIn) {
			router.push("/");
		}
	}, [isSignedIn, router]);

	return (
		<div className="h-full flex gap-y-8 flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">Sign Up</h1>
			<div>{error}</div>
			<div className="flex flex-col gap-y-2">
				{!waitingForCode ? (
					<>
						<input
							key="email-input"
							type="email"
							onChange={(e) => setEmailAddress(e.target.value)}
							placeholder="Email"
						/>
						<input
							key="password-input"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
						<div className="flex justify-between">
							<button
								className="border-1 w-1/3 border border-black rounded-lg"
								onClick={handleSubmit}
							>
								Submit
							</button>
							<Link
								className="border-1 w-1/3 text-center border border-black rounded-lg"
								href="/sign-in"
							>
								Go To Sign In
							</Link>
						</div>
					</>
				) : (
					<>
						<input
							key="one-time-code-input"
							type="text"
							onChange={(e) => setOneTimeCode(e.target.value)}
							placeholder="One Time Code"
						/>
						<div className="flex justify-between">
							<button
								className="border-1 w-full border border-black rounded-lg"
								onClick={handleCodeSubmit}
							>
								Submit
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
