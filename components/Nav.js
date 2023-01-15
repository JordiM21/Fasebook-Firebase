import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
	const [user, loading] = useAuthState(auth);
	if (!user && loading) {
		return <p>Loading...</p>;
	}
	if (!user) {
		return null;
	}
	let name = user.displayName;
	let [firstName, secondName] = name.split(" ");

	return (
		<nav className="bg-white md:rounded-lg flex justify-around gap-10 sm:gap-20 items-center py-2">
			<Link href="/">
				<button className="text-lg md:text-2xl font-bold">
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
							<button className="font-medium bg-cyan-500 text-white py-2 px-2 md:px-4 rounded-lg textx-sm">
								+ Post
							</button>
						</Link>
						<Link
							className="group transition 1s ease-in p-2 rounded-lg flex items-center gap-1"
							href="/dashboard"
						>
							<div className="p-1 bg-cyan-500 rounded-full">
								<img
									className="w-12 rounded-full cursor-pointer"
									src={
										user.photoURL
									}
								/>
							</div>

							<div className="group-hover:underline decoration-cyan-700 text-center">
								<p className="text-lg font-medium">
									{
										firstName
									}{" "}
									{
										secondName[0]
									}
									.
								</p>
								<p className="text-xs text-gray-800">
									See my
									profile
								</p>
							</div>
						</Link>
					</div>
				)}
			</ul>
		</nav>
	);
}
