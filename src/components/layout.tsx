import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
	const { isSignedIn } = useUser();
	const { signOut } = useAuth();

	return (
		<div
			className={`flex flex-col w-full h-full ${
				isSignedIn ? "bg-green-300" : "bg-red-300"
			}`}
		>
			<div className="w-full flex justify-between bg-gray-50 p-4">
				<Link href="/" className="text-2xl font-semibold">
					Home
				</Link>
				{isSignedIn && (
					<button
						onClick={() => signOut()}
						className="text-2xl font-semibold"
					>
						Sign Out
					</button>
				)}
			</div>
			{children}
		</div>
	);
}
