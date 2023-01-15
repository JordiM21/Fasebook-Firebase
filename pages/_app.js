import "../styles/globals.css";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
	const router = useRouter();
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={router.route}
				initial="initialState"
				animate="animateState"
				exit="exitState"
				transition={{
					transition: 2,
					delay: 0.1,
				}}
				variants={{
					initialState: {
						opacity: 0,
					},
					animateState: {
						opacity: 1,
					},
					exitState: {},
				}}
			>
				<Layout>
					<ToastContainer limit={1} />
					<Component {...pageProps} />
				</Layout>
			</motion.div>
		</AnimatePresence>
	);
}
