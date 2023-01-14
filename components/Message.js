export default function Message({ children, avatar, username, description }) {
	return (
		<div className="bg-white p-8 border-b-2 rounded-lg my-4">
			<div className="flex items-center gap-2">
				<img
					src={avatar}
					className="rounded-full w-10"
				/>
				<h2>{username}</h2>
			</div>
			<div className="py-8">
				<p className="text-2xl">{description}</p>
			</div>
			{children}
		</div>
	);
}
