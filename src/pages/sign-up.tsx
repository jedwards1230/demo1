import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
	const { signUp } = useSignUp();
	const router = useRouter();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event: {
		target: any;
		preventDefault: () => void;
	}) => {
		event.preventDefault();
		console.log("checking:", emailAddress, password);

		// Check response for next step
		const response = await signUp!
			.create({
				emailAddress,
				password,
			})
			.then((result) => {
				if (result.status === "complete") {
					console.log(result);
					router.push("/");
					//setActive({ session: result.createdSessionId });
				} else {
					console.log(result);
				}
			})
			.catch((err) => console.error("error", err.errors[0].longMessage));
	};

	return (
		<div className="h-full flex gap-y-8 flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">Sign Up</h1>
			<div className="flex flex-col gap-y-2">
				<input
					type="email"
					name="email"
					onChange={(e) => setEmailAddress(e.target.value)}
					placeholder="Email"
				/>
				<input
					type="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button onClick={handleSubmit}>Sign Up</button>
			</div>
		</div>
	);
}
