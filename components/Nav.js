import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
	const [user, loading] = useAuthState(auth);

	return (
		<nav className="bg-white md:rounded-lg flex justify-around gap-36 items-center py-2">
			<Link href="/">
				<button className="text-lg font-medium">
					Fasebook.com
				</button>
			</Link>
			<ul className="flex items-center gap-10">
				{!user && (
					<Link
						className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8"
						href={"/auth/Login"}
					>
						Join Now
					</Link>
				)}
				{user && (
					<div className="flex items-center gap-6">
						<Link href="/post">
							<button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-lg textx-sm">
								+ Post
							</button>
						</Link>
						<Link
							className="bg-cyan-500 transition duration-200 ease-in p-2 rounded-lg"
							href="/dashboard"
						>
							<p className="text-white">
								Profile
							</p>
							<img
								className="w-12 rounded-full cursor-pointer"
								src={
									user.photoURL
								}
							/>
						</Link>
					</div>
				)}
			</ul>
		</nav>
	);
}
