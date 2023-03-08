export default function SignIn() {
	return (
		<div className="h-full flex gap-y-8 flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">Sign In</h1>
			<div className="flex flex-col gap-y-2">
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Password" />
				<button>Sign In</button>
			</div>
		</div>
	);
}
