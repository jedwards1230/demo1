import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignUp() {
	const { signUp, setSession } = useSignUp();
	const [waitingForCode, setWaitingForCode] = useState(false);
	const [oneTimeCode, setOneTimeCode] = useState("");
	const router = useRouter();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		// Check response for next step
		console.log("creating");
		await signUp!
			.create({
				emailAddress,
				password,
			})
			.catch((err) => console.error("error", err.errors[0].longMessage));

		// Prepare the verification process for the email address.
		// This method will send a one-time code to the email address supplied to
		// the current sign-up.
		console.log("preparing");
		await signUp!.prepareEmailAddressVerification();
		setWaitingForCode(true);
	};

	const handleCodeSubmit = async () => {
		// Attempt to verify the email address by supplying the one-time code that
		// was sent in the previous step.
		console.log("attempting");
		const response = await signUp!.attemptEmailAddressVerification({
			code: oneTimeCode,
		});

		console.log("setting session");
		setSession!(response.createdSessionId);
		router.push("/");
	};

	return (
		<div className="h-full flex gap-y-8 flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">Sign Up</h1>
			<div className="flex flex-col gap-y-2">
				{!waitingForCode ? (
					<>
						<input
							type="email"
							onChange={(e) => setEmailAddress(e.target.value)}
							placeholder="Email"
						/>
						<input
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
						<button onClick={handleSubmit}>Sign Up</button>
					</>
				) : (
					<>
						<input
							type="text"
							onChange={(e) => setOneTimeCode(e.target.value)}
							placeholder="One Time Code"
						/>
						<button onClick={handleCodeSubmit}>Sign Up</button>
					</>
				)}
			</div>
		</div>
	);
}
