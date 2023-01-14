import Nav from "./Nav";

export default function Layout({ children }) {
	return (
		<div className="md:max-w-2xl md:mx-auto font-poppins">
			<Nav />
			<main className=" mx-8">{children}</main>
		</div>
	);
}
