import Message from "../components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import {
	arrayUnion,
	doc,
	getDoc,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import defaultImage from "../public/default-img.png";

export default function Details() {
	const router = useRouter();
	const routeData = router.query;
	const [message, setMessage] = useState("");
	const [allMessage, setAllMessages] = useState([]);

	//Submit a message
	const submitMessage = async () => {
		//Check if the user is logged
		if (!auth.currentUser) return router.push("/auth/login");

		if (!message) {
			toast.error("Don't leave an empty message 😅", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 1500,
			});
			return;
		}
		const docRef = doc(db, "posts", routeData.id);
		await updateDoc(docRef, {
			comments: arrayUnion({
				message,
				avatar: auth.currentUser.photoURL,
				userName: auth.currentUser.displayName,
				time: Timestamp.now(),
			}),
		});
		setMessage("");
	};

	//Get Comments
	//we can also use snapshot to refresh auto
	const getComments = async () => {
		const docRef = doc(db, "posts", routeData.id);
		const docSnap = await getDoc(docRef);
		setAllMessages(docSnap.data().comments);
	};

	useEffect(() => {
		getComments();
	}, [allMessage]);

	useEffect(() => {
		if (!router.isReady) return;
		getComments();
	}, [router.isReady]);

	console.log(allMessage);
	return (
		<div>
			<Message {...routeData}></Message>
			<div className="my-4">
				<div className="flex">
					<input
						onChange={(e) =>
							setMessage(
								e.target.value
							)
						}
						type="text"
						value={message}
						placeholder="Send a message 😀"
						className="bg-gray-800 w-full p-2 text-white text-sm rounded-l-lg"
					/>
					<button
						onClick={submitMessage}
						className="bg-cyan-500 text-white py-2 px-4 text-sm rounded-r-lg"
					>
						Submit
					</button>
				</div>
				<div className="py-6">
					<h2 className="font-bold">Comments</h2>
					{allMessage?.map((message) => (
						<div
							className="bg-white p-4 my-4 border-2 rounded-lg"
							key={message.time}
						>
							<div className="flex items-center gap-2 mb-4">
								<img
									className="w-6 rounded-full"
									src={
										message.avatar
									}
									alt=""
								/>
								<h2 className="text-sm">
									{
										message.userName
									}
								</h2>
							</div>
							<h2 className="text-lg">
								{
									message.message
								}
							</h2>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
