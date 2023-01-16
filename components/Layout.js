import Nav from "./Nav";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Layout({ children }) {
	const [user, loading, error] = useAuthState(auth);

	if (error) {
		return <p>Error: {error.message}</p>;
	}
	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="md:max-w-2xl lg:max-w-full md:mx-auto font-poppins">
			<Nav user={user} />
			<main className="mx-8 lg:mx-52">{children}</main>
		</div>
	);
}
