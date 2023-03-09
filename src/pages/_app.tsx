import Layout from "@/components/layout";
import "@/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ClerkProvider {...pageProps}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ClerkProvider>
	);
}
