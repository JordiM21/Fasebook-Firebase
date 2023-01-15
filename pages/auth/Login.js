import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
	const route = useRouter();
	const [user, loading] = useAuthState(auth);
	if (!user && loading) {
		return <p>Loading...</p>;
	}
	if (!user) {
		return null;
	}
	//Sign in with google
	const googleProvider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		try {
			const result = await signInWithPopup(
				auth,
				googleProvider
			);
			route.push("/");
		} catch (error) {
			alert("Something went wrong when login");
		}
	};
	//This useEffect handles when a user already logged wants to go to the login page
	useEffect(() => {
		if (user) {
			alert("You are already logged in!");
			route.push("/");
		}
	}, [user]);

	return (
		<div className="bg-white shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
			<h2 className="text-2xl font-medium">Join Today</h2>
			<div className="py-4">
				<h3 className="py-4">
					Sign in with one of the providers
				</h3>
				<button
					onClick={GoogleLogin}
					className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
				>
					<FcGoogle className="text-2xl" />
					Sign in with Google
				</button>
			</div>
		</div>
	);
}
