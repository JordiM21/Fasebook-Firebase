import Nav from "./Nav";

export default function Layout({ children }) {
	return (
		<div className="md:max-w-2xl lg:max-w-full md:mx-auto font-poppins">
			<Nav />
			<main className="mx-8 lg:mx-52">{children}</main>
		</div>
	);
}
