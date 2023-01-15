export default function Message({ children, avatar, username, description }) {
	return (
		<div className="bg-white border-b-2 rounded-lg my-4">
			<div className="bg-gray-400 flex rounded-lg p-2 items-center gap-2">
				<img
					src={avatar}
					className="rounded-full w-10"
				/>
				<h2>{username}</h2>
			</div>
			<div className="p-6">
				<div className="pb-2">
					<p className="text-2xl">
						{description}
					</p>
				</div>
				{children}
			</div>
		</div>
	);
}
