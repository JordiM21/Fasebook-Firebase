import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import Message from "../components/Message";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";

export default function Dashboard() {
	const route = useRouter();
	const [user, loading] = useAuthState(auth);
	const [posts, setPosts] = useState([]);
	//See if user is logged
	const getData = async () => {
		if (loading) return;
		if (!user) return route.push("/auth/Login");
		const collectionRef = collection(db, "posts");
		const q = query(collectionRef, where("user", "==", user.uid));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			setPosts(
				snapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		});
		return unsubscribe;
	};
	useEffect(() => {
		getData();
	}, [user, loading]);

	//Sign Out
	const out = async () => {
		try {
			await auth.signOut().then(alert("signed out!"));
		} catch (error) {
			console.log(error);
		}
	};

	//Delete Post
	const deletePost = async (id) => {
		const docRef = doc(db, "posts", id);
		await deleteDoc(docRef);
	};
	return (
		<div className="my-8 text-g font-medium">
			<header className="flex justify-center gap-2 md:gap-8 lg:gap-12 my-6">
				<div className="rounded-full relative">
					<img
						className="rounded-full"
						src={user.photoURL}
					/>
					<div className="absolute bg-green-600 p-3 bottom-0 right-0 rounded-full" />
				</div>
				<div className="text-center">
					<h2 className="text-3xl">
						{user?.displayName}
					</h2>
					<p className="text-sm text-gray-800">
						{user?.email}
					</p>
				</div>
			</header>
			<div className="flex justify-between items-center">
				<h1>Your Posts</h1>
				<button
					className="font-medium text-white bg-gray-800 py-2 px-4 rounded-lg"
					onClick={out}
				>
					Sign out
				</button>
			</div>
			<div>
				{posts.map((post) => (
					<Message {...post} key={post.id}>
						<div className="flex justify-end gap-6">
							<Link
								href={{
									pathname: "/post",
									query: post,
								}}
							>
								<button className="text-teal-500 flex items-center justify-center gap-2 py-2 text-sm">
									Edit
									<AiFillEdit className="text-2xl" />
								</button>
							</Link>
							<button
								onClick={() =>
									deletePost(
										post.id
									)
								}
								className="text-red-500 flex items-center justify-center gap-2 py-2 text-sm"
							>
								Delete
								<BsTrash2Fill className="text-2xl" />
							</button>
						</div>
					</Message>
				))}
			</div>
		</div>
	);
}
